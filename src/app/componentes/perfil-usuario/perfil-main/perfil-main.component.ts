import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { formatDistance } from 'date-fns';
import { es } from 'date-fns/locale';
import { Observable, Subject, takeUntil } from 'rxjs';
import { PersonaDTO } from 'src/app/dto/persona-dto';
import { PerfilUsuarioService } from 'src/app/service/perfil-usuario.service';

@Component({
  selector: 'app-perfil-main',
  templateUrl: './perfil-main.component.html',
  styleUrls: ['./perfil-main.component.css']
})
export class PerfilMainComponent implements OnInit, OnDestroy{

  usuario$!:Observable<PersonaDTO | null>;

  desuscribeSubject:Subject<any> = new Subject;
  // True = publicaciones
  switchPublicacionesOComentarios!:Boolean;
  
  header:string = "";
  
  onDestroy$:Subject<boolean> = new Subject();

  constructor(private perfilUsuarioService:PerfilUsuarioService, private router:Router){

  }

  ngOnInit(): void {
    this.usuario$ = this.perfilUsuarioService.getPerfilUsuario;

    this.perfilUsuarioService.getSwitchPublicacionesOComentarios.pipe(takeUntil(this.onDestroy$)).subscribe(booleano =>{
      this.switchPublicacionesOComentarios = booleano;

      this.switchPublicacionesOComentarios ? this.header = "Publicaciones" : this.header = "Comentarios"
    });
  }

  ngOnDestroy(): void {
    this.onDestroy$.next(true);
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

    this.router.navigate(["/usuario", nombreUsuario]);
  }
}
