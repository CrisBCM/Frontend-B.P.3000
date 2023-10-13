import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { formatDistance } from 'date-fns';
import { es } from 'date-fns/locale';
import { Observable, Subject, takeUntil } from 'rxjs';
import { PersonaDTO } from 'src/app/dto/persona-dto';
import { Persona } from 'src/app/modelo/interfaces/persona';
import { Publicacion } from 'src/app/modelo/interfaces/publicacion';
import { ForoService } from 'src/app/service/foro.service';
import { PerfilUsuarioService } from 'src/app/service/perfil-usuario.service';
import { PublicacionService } from 'src/app/service/publicacion.service';

@Component({
  selector: 'app-publicaciones-main',
  templateUrl: './publicaciones-main.component.html',
  styleUrls: ['./publicaciones-main.component.css']
})
export class PublicacionesMainComponent implements OnInit, OnDestroy{
  
  usuario$!:Observable<PersonaDTO | null>;
  @Input() persona$!:Observable<Persona | null> | null;
  persona!:Persona;
  idPublicacion:number = -111;
  onDestroy$:Subject<Boolean> = new Subject();
  switchEditarPublicacion:boolean = false;

  constructor(private perfilUsuarioService:PerfilUsuarioService, private router:Router, private foroService:ForoService, private publicacionService:PublicacionService){}

  ngOnInit(): void {
    this.usuario$ = this.perfilUsuarioService.getPerfilUsuario;

    if(this.persona$){
      this.persona$.pipe(takeUntil(this.onDestroy$)).subscribe((persona:Persona | null)=>{
        if(persona){
          this.persona = persona;
          console.log(this.persona.publicaciones + "PUBLICACIONESSSSS");
        }
      })
    }
  }

  ngOnDestroy(): void {
   this.onDestroy$.next(true);
  }
  actualizarPublicacion(publicacion:Publicacion){
    
  }
  setPublicacionEditar(publicacion:Publicacion){
    this.switchEditarPublicacion = true;
    this.publicacionService.setPublicacion = publicacion;
    console.log(publicacion);
  }

  redirigirAPublicacion(idPublicacion:number){
    this.router.navigate(["/publicacion", idPublicacion]);
  }

  eliminarPublicacion(idPublicacion:number){
    console.log("IDPUBLICACION: " + idPublicacion);
    this.foroService.eliminarPublicacion(idPublicacion).subscribe(()=>{
    
      let publicaciones:Publicacion[] = this.persona?.publicaciones.filter(publicacion => publicacion.id != idPublicacion);

      this.persona.publicaciones = publicaciones;

      this.idPublicacion = -111;
    })
  }

  redirigirAPerfilUsuario(nombreUsuario:string){
    this.perfilUsuarioService.redirigirAPerfilUsuario(nombreUsuario);
  }
  
}
