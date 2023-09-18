import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { formatDistance } from 'date-fns';
import { es } from 'date-fns/locale';
import { Observable } from 'rxjs';
import { Comentario } from 'src/app/modelo/interfaces/comentario';
import { Publicacion } from 'src/app/modelo/interfaces/publicacion';
import { Respuesta } from 'src/app/modelo/interfaces/respuesta';
import { ForoService } from 'src/app/service/foro.service';
import { PerfilUsuarioService } from 'src/app/service/perfil-usuario.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-comentarios',
  templateUrl: './comentarios.component.html',
  styleUrls: ['./comentarios.component.css']
})
export class ComentariosComponent {
  @Input() publicacion!:Publicacion;
  tokenDecoded$!:Observable<any>;
  idComentario!:number;
  editarSwitchComentario:boolean = false;
  modalEliminar:boolean = false;
  tempContenido:string = "";
  respuestasMostradas:number[] = [];

  constructor(private perfilUsuarioService:PerfilUsuarioService, private router:Router, tokenService:TokenService, private foroService:ForoService){
    this.tokenDecoded$ = tokenService.tokenDecoded$;
  }
  eliminarComentario(){
    this.foroService.eliminarComentario(this.idComentario).subscribe(()=>{
      console.log("IDCOMENTARIO: " + this.idComentario + ", IDPublicacion: " + this.publicacion.id);
      this.foroService.seteliminarComentario(this.idComentario, this.publicacion.id);
      this.modalEliminar = false;
    })
  }
  anadirComentario(comentario:Comentario){
    this.publicacion.comentarios.push(comentario);
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
    this.router.navigate(["/bp-perfil", nombreUsuario]);
  }
  calcularAntiguedadFecha(fecha:Date){
    let date = new Date(fecha);
    return formatDistance(date, new Date(), {locale:es});
  }
  // eliminarComentario(idComentario:number){
  //   this.foroService.eliminarComentario(idComentario).subscribe(()=>{
  //   })
  //   let nuevaListaComentario = this.publicacion.comentarios.filter(comentario => comentario.id != idComentario);

  //   this.publicacion.comentarios = nuevaListaComentario;
  // }
  editarComentario(comentarioI:number){
    const formData = new FormData();

    formData.append("contenido", this.tempContenido);

    this.foroService.editarComentario(this.idComentario, formData).subscribe(nuevoComentario =>{
      console.log(JSON.stringify(nuevoComentario) + " NUEVO COMENTARIO!!");
      this.publicacion.comentarios[comentarioI] = nuevoComentario;
      this.editarSwitchComentario = false;
    })
  }
  mostrarRespuestas(comentarioI:number){
    this.respuestasMostradas.push(comentarioI);
  }
  ocultarRespuestas(comentarioI:number){
    let nuevasRespuestasMostradas = this.respuestasMostradas.filter(respuesta => respuesta != comentarioI);

    this.respuestasMostradas = nuevasRespuestasMostradas;
  }
  anadirRespuestaComentario(comentarioI:number, respuesta:Respuesta){
    console.log("ESTA FUNCIONANDO")
    this.publicacion.comentarios[comentarioI].respuestas.push(respuesta);
  }
}