import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { formatDistance } from 'date-fns';
import { es } from 'date-fns/locale';
import { Observable } from 'rxjs';
import { Comentario } from 'src/app/modelo/interfaces/comentario';
import { Publicacion } from 'src/app/modelo/interfaces/publicacion';
import { ForoService } from 'src/app/service/foro.service';
import { PerfilUsuarioService } from 'src/app/service/perfil-usuario.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-respuestas',
  templateUrl: './respuestas.component.html',
  styleUrls: ['./respuestas.component.css']
})
export class RespuestasComponent {
  tokenDecoded$:Observable<any>;
  modalEliminar:boolean = false;
  @Input() comentario!:Comentario;
  @Input() respuestasMostradas:number[] = [];
  @Input() publicacion!:Publicacion;
  @Input() comentarioIndice!:number;
  idRespuesta!:number;
  editarSwitchRespuesta:boolean = false;
  tempContenido:string = "";

  constructor(private perfilUsuarioService:PerfilUsuarioService, private router:Router, private foroService:ForoService, private tokenService:TokenService){
    this.tokenDecoded$ = tokenService.tokenDecoded$;
  }
  
  eliminarRespuesta(){
    this.foroService.eliminarRespuesta(this.idRespuesta).subscribe( data =>{
      console.log(data);
      this.foroService.setEliminarRespuesta(this.idRespuesta, this.publicacion.id, this.comentario.id);
      this.modalEliminar = false;
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
    this.router.navigate(["/bp-perfil", nombreUsuario]);
  }
  calcularAntiguedadFecha(fecha:Date){
    let date = new Date(fecha);
    return formatDistance(date, new Date(), {locale:es});
  }
  switchEdicionRespuesta(contenido:string){
    this.editarSwitchRespuesta = true;
    this.tempContenido = contenido;
  }
  // eliminarRespuesta(idRespuesta:number, comentarioI:number){
    
    

  //   let nuevaListaRespuesta = this.publicacion.comentarios[comentarioI].respuestas.filter(respuesta => respuesta.id != idRespuesta);

  //   this.publicacion.comentarios[comentarioI].respuestas = nuevaListaRespuesta;

  // }
  editarRespuesta(respuestaI:number){
    const formData = new FormData();

    formData.append("contenido", this.tempContenido);

    this.foroService.editarRespuesta(this.idRespuesta, formData).subscribe(nuevaRespuesta =>{

      this.publicacion.comentarios[this.comentarioIndice].respuestas[respuestaI].contenido = nuevaRespuesta.contenido;
      this.editarSwitchRespuesta = false;
    })
  }
}
