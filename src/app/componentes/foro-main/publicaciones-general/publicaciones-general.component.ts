import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { formatDistance } from 'date-fns';
import es from 'date-fns/locale/es';
import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs';
import { Publicacion } from 'src/app/modelo/interfaces/publicacion';
import { ForoService } from 'src/app/service/foro.service';
import { PerfilUsuarioService } from 'src/app/service/perfil-usuario.service';
import { BtnPaginacionComponent } from '../../btn-paginacion/btn-paginacion.component';

@Component({
  selector: 'app-publicaciones-general',
  templateUrl: './publicaciones-general.component.html',
  styleUrls: ['./publicaciones-general.component.css']
})
export class PublicacionesGeneralComponent implements OnInit, OnDestroy{
  paginaActual: number = 1;
  cantMostrarPublicaciones: number = 5;
  publicaciones!:Publicacion[] | null;
  onDestroy$:Subject<boolean> = new Subject();
  opcionesDeFiltro:string[] = ["Mas Nuevo","Antiguo", "Mas gustado"];
  nombreFiltroPorTema:string = "Mas Nuevo";
  @ViewChild('btnPaginacion') btnPaginacion!:BtnPaginacionComponent;

  constructor(private router: Router, private perfilUsuarioService: PerfilUsuarioService, private foroService:ForoService){}

  ngOnInit(): void {
    this.foroService.behaviorSubjectPublicaciones.pipe(takeUntil(this.onDestroy$)).subscribe(publicaciones =>{
      this.publicaciones = publicaciones;
    });
  }

  ngOnDestroy(): void {
    this.onDestroy$.next(true);
  }

  reiniciarBotones(){
    this.paginaActual = 1;
    this.btnPaginacion.paginaActual = this.paginaActual;
  }
  
  filtrar(filtro:string){
    const filtros: {[key:string]: ()=> void} = {
      'Mas Nuevo' : ()=> {this.nombreFiltroPorTema = filtro; this.filtrarPorMasNuevo()},
      'Antiguo' : ()=> {this.nombreFiltroPorTema = filtro; this.filtrarPorAntiguedad()},
      'Mas gustado' : ()=> {this.nombreFiltroPorTema = filtro; this.filtrarPorMasGustado()}
    }
    filtros[filtro]();
  }

  filtrarPorPalabra(palabra:string){
      this.paginaActual = 1;
      this.publicaciones = this.foroService.getPublicacionesFiltroPalabra(palabra);
  }
  filtrarPorAntiguedad(){
     if(this.foroService.publicacionesAntiguas){
      this.publicaciones = this.foroService.publicacionesAntiguas;
     }
  }
  filtrarPorMasGustado(){
    if(this.foroService.publicacionesMasGustado){
      this.publicaciones = this.foroService.publicacionesMasGustado;
     }
  }
  filtrarPorMasNuevo(){
    if(this.foroService.publicacionesMasNuevas){
      this.publicaciones = this.foroService.publicacionesMasNuevas;
     }
  }

  get publicacionesPaginadas() {
    const inicio = (this.paginaActual - 1) * this.cantMostrarPublicaciones;
    const fin = inicio + this.cantMostrarPublicaciones;

    return this.publicaciones?.slice(inicio, fin);
  }

  redirigirAPublicacion(idPublicacion: number) {
    this.router.navigate(['/publicacion', idPublicacion]);
  }

  redirigirAPerfilUsuario(nombreUsuario: string) {
    this.perfilUsuarioService.redirigirAPerfilUsuario(nombreUsuario);
  }
}
