import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { formatDistance } from 'date-fns';
import { es } from 'date-fns/locale';
import { Observable, map } from 'rxjs';
import { IComentario, IPublicacion, IRespuesta } from 'src/app/modelo/interfaces/IPublicacion';
import { ForoService } from 'src/app/service/foro.service';

@Component({
  selector: 'app-publicacion',
  templateUrl: './publicacion.component.html',
  styleUrls: ['./publicacion.component.css']
})
export class PublicacionComponent{
  idPublicacion!:number;
  idComentario!:number;
  idRespuesta!:number;
  publicacion!:IPublicacion;
  publicaciones$:Observable<IPublicacion[] | null>;
  respuestasMostradas:number[] = [];
  mostrar:boolean = true;
  responder:boolean = false;
  tempContenido:string = "";
  editarSwitchRespuesta:boolean = false;
  editarSwitchComentario:boolean = false;

  constructor(private activdeRoute:ActivatedRoute, private foroService:ForoService){
    activdeRoute.params.subscribe((params:Params) =>{
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
  calcularAntiguedadFecha(fecha:Date){
    let date = new Date(fecha);
    return formatDistance(date, new Date(), {locale:es});
  }

  abrirResponder(){
    this.responder = true;
  }

  anadirComentario(comentario:IComentario){
    this.publicacion.comentarios.push(comentario);
    console.log(JSON.stringify(comentario) +  "SOY COMENTARIO")
  }
  
  anadirRespuestaComentario(comentarioI:number, respuesta:IRespuesta){
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
