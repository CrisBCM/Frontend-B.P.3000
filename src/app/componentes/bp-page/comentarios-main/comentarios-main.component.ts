import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { formatDistance } from 'date-fns';
import { es } from 'date-fns/locale';
import { Observable } from 'rxjs';
import { PersonaDTO } from 'src/app/dto/persona-dto';
import { Persona } from 'src/app/modelo/interfaces/persona';
import { PerfilUsuarioService } from 'src/app/service/perfil-usuario.service';

@Component({
  selector: 'app-comentarios-main',
  templateUrl: './comentarios-main.component.html',
  styleUrls: ['./comentarios-main.component.css']
})
export class ComentariosMainComponent implements OnInit{

  usuario$!:Observable<PersonaDTO | null>;
  @Input() persona$!:Observable<Persona | null> | null;

  constructor(private perfilUsuarioService:PerfilUsuarioService, private router:Router){

  }
  ngOnInit(): void {
    this.usuario$ = this.perfilUsuarioService.getPerfilUsuario;
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
