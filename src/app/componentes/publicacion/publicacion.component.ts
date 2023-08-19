import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { formatDistance } from 'date-fns';
import { es } from 'date-fns/locale';
import { Observable, map } from 'rxjs';
import { Comentario } from 'src/app/modelo/interfaces/comentario';
import { Publicacion } from 'src/app/modelo/interfaces/publicacion';
import { Respuesta } from 'src/app/modelo/interfaces/respuesta';
import { ForoService } from 'src/app/service/foro.service';
import { PerfilUsuarioService } from 'src/app/service/perfil-usuario.service';

@Component({
  selector: 'app-publicacion',
  templateUrl: './publicacion.component.html',
  styleUrls: ['./publicacion.component.css']
})
export class PublicacionComponent{
  idPublicacion!:number;
  idComentario!:number;
  idRespuesta!:number;
  publicacion!:Publicacion;
  publicaciones$:Observable<Publicacion[] | null>;
  respuestasMostradas:number[] = [];
  mostrar:boolean = true;
  responder:boolean = false;
  tempContenido:string = "";
  editarSwitchRespuesta:boolean = false;
  editarSwitchComentario:boolean = false;

  constructor(activatedRoute:ActivatedRoute, private foroService:ForoService, private router:Router, private perfilUsuarioService:PerfilUsuarioService){
    activatedRoute.params.subscribe((params:Params) =>{
      this.idPublicacion = params["idPublicacion"];
    })

    this.publicaciones$ = foroService.behaviorSubjectPublicaciones;
    
    this.publicaciones$
    .pipe(map(publicaciones => publicaciones?.filter(publicacion => publicacion.id == this.idPublicacion)))
    .subscribe(arrayPublicacionFiltrada =>{
      if(arrayPublicacionFiltrada != null){
        this.publicacion = arrayPublicacionFiltrada[0];
        console.log(JSON.stringify(this.publicacion));
      }
    })
  }
  
  redirigirAPerfilUsuario(nombreUsuario:string){
    let nombreUsuarioActual;

    this.perfilUsuarioService.getNombreUsuarioActual.subscribe(nombreUsuarioSub =>{
      nombreUsuarioActual = nombreUsuarioSub;
    })

    if(nombreUsuarioActual != nombreUsuario){
      this.perfilUsuarioService.setPerfilUsuario = null;
      this.perfilUsuarioService.setNombreUsuarioActual = nombreUsuario;
    }

    this.router.navigate(["/usuario", nombreUsuario]);
  }

  calcularAntiguedadFecha(fecha:Date){
    let date = new Date(fecha);
    return formatDistance(date, new Date(), {locale:es});
  }

  abrirResponder(){
    this.responder = true;
  }

  anadirComentario(comentario:Comentario){
    this.publicacion.comentarios.push(comentario);
    console.log(JSON.stringify(comentario) +  "SOY COMENTARIO")
  }
  
  anadirRespuestaComentario(comentarioI:number, respuesta:Respuesta){
    console.log("ESTA FUNCIONANDO")
    this.publicacion.comentarios[comentarioI].respuestas.push(respuesta);
  }

  mostrarRespuestas(comentarioI:number){
    this.respuestasMostradas.push(comentarioI);
  }
  ocultarRespuestas(comentarioI:number){
    let nuevasRespuestasMostradas = this.respuestasMostradas.filter(respuesta => respuesta != comentarioI);

    this.respuestasMostradas = nuevasRespuestasMostradas;
  }
  eliminarComentario(idComentario:number){
    console.log(idComentario);
    this.foroService.eliminarComentario(idComentario).subscribe(()=>{
    })
    let nuevaListaComentario = this.publicacion.comentarios.filter(comentario => comentario.id != idComentario);

    this.publicacion.comentarios = nuevaListaComentario;
  }
  eliminarRespuesta(idRespuesta:number, comentarioI:number){
    
    this.foroService.eliminarRespuesta(idRespuesta).subscribe( data =>{
      console.log(data);
    })

    let nuevaListaRespuesta = this.publicacion.comentarios[comentarioI].respuestas.filter(respuesta => respuesta.id != idRespuesta);

    this.publicacion.comentarios[comentarioI].respuestas = nuevaListaRespuesta;

  }
  switchEdicionRespuesta(contenido:string){
    this.editarSwitchRespuesta = true;
    this.tempContenido = contenido;
  }
  switchEdicionComentario(contenido:string){
    this.editarSwitchComentario = true;
    this.tempContenido = contenido;
  }
  editarRespuesta(idRespuesta:number, comentarioI:number, respuestaI:number){
    const formData = new FormData();

    formData.append("contenido", this.tempContenido);

    this.foroService.editarRespuesta(idRespuesta, formData).subscribe(nuevaRespuesta =>{

      this.publicacion.comentarios[comentarioI].respuestas[respuestaI].contenido = nuevaRespuesta.contenido;
      this.editarSwitchRespuesta = false;
    })
  }

  editarComentario(idComentario:number, comentarioI:number){
    const formData = new FormData();

    formData.append("contenido", this.tempContenido);

    this.foroService.editarComentario(idComentario, formData).subscribe(nuevoComentario =>{

      this.publicacion.comentarios[comentarioI] = nuevoComentario;
      this.editarSwitchComentario = false;
    })
  }


}
