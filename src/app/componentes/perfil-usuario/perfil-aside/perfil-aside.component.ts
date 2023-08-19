import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';
import { PersonaDTO } from 'src/app/dto/persona-dto';
import { PerfilUsuarioService } from 'src/app/service/perfil-usuario.service';

@Component({
  selector: 'app-perfil-aside',
  templateUrl: './perfil-aside.component.html',
  styleUrls: ['./perfil-aside.component.css']
})
export class PerfilAsideComponent implements OnInit, OnDestroy{
  
  usuario$!:Observable<PersonaDTO | null>
  switchPublicacionesOComentarios!:Boolean;

  onDestroy$:Subject<Boolean> = new Subject();

  constructor(private perfilUsuarioService:PerfilUsuarioService){}

  ngOnInit(): void {
    this.usuario$ = this.perfilUsuarioService.getPerfilUsuario;

    this.perfilUsuarioService.getSwitchPublicacionesOComentarios
    .pipe(takeUntil(this.onDestroy$))
    .subscribe(booleano =>{
      this.switchPublicacionesOComentarios = booleano;
    });
  }
  ngOnDestroy(): void {
    this.onDestroy$.next(true);
  }
  cambiarSwitchPublicacionOComentario(trueFalse:boolean){
    this.perfilUsuarioService.setSwitchPublicacionesOComentarios = trueFalse;
  }
}
