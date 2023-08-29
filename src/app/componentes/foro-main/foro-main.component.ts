import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ForoService } from 'src/app/service/foro.service';
import { formatDistance } from 'date-fns';
import { es } from 'date-fns/locale';
import { Publicacion } from 'src/app/modelo/interfaces/publicacion';
import { PerfilUsuarioService } from 'src/app/service/perfil-usuario.service';

@Component({
  selector: 'app-foro-main',
  templateUrl: './foro-main.component.html',
  styleUrls: ['./foro-main.component.css']
})
export class ForoMainComponent {
  
  publicaciones$:Observable<Publicacion[] | null>;

  constructor(private foroService:ForoService, private router:Router, private perfilUsuarioService:PerfilUsuarioService){
    this.publicaciones$ = this.foroService.behaviorSubjectPublicaciones;
  }
  
  redirigirAPublicacion(idPublicacion:number){
    this.router.navigate(["/publicacion", idPublicacion]);
  }

  calcularAntiguedadFecha(fecha:Date){
    let date = new Date(fecha);
    return formatDistance(date, new Date(), {locale:es});
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
