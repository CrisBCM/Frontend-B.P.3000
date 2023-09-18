import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { formatDistance } from 'date-fns';
import { es } from 'date-fns/locale';
import { Observable } from 'rxjs';
import { PersonaDTO } from 'src/app/dto/persona-dto';
import { Persona } from 'src/app/modelo/interfaces/persona';
import { ForoService } from 'src/app/service/foro.service';
import { PerfilUsuarioService } from 'src/app/service/perfil-usuario.service';
import { SharingService } from 'src/app/service/sharing.service';

@Component({
  selector: 'app-comentarios-main',
  templateUrl: './comentarios-main.component.html',
  styleUrls: ['./comentarios-main.component.css']
})
export class ComentariosMainComponent implements OnInit{

  usuario$!:Observable<PersonaDTO | null>;
  @Input() persona$!:Observable<Persona | null> | null;
  switchEditar:boolean = false;
  contenidoTemporal:string = "";
  idComentario!:number;

  constructor(private perfilUsuarioService:PerfilUsuarioService, private router:Router, private foroService:ForoService, private sharingService:SharingService){
  }

  ngOnInit(): void {
    this.usuario$ = this.perfilUsuarioService.getPerfilUsuario;
  }
  editarComentario(indiceComentario:number, idPublicacion:number){
    const formData = new FormData();
    formData.append("contenido", this.contenidoTemporal);

    this.foroService.editarComentario(this.idComentario, formData).subscribe(comentarioNuevo =>{
      console.log("COMENTARIONUEVO: " + JSON.stringify(comentarioNuevo));
      this.sharingService.editarComentario(indiceComentario, comentarioNuevo);
      this.foroService.setEditarComentario(idPublicacion, comentarioNuevo);
      this.switchEditar = false;
    })
  }

  calcularAntiguedadFecha(fecha:Date){
    let date = new Date(fecha);
    return formatDistance(date, new Date(), {locale:es});
  }

  redirigirAPublicacion(idPublicacion:number){
    this.router.navigate(["/publicacion", idPublicacion]);
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
}