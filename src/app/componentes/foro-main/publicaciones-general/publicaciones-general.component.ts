import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { formatDistance } from 'date-fns';
import es from 'date-fns/locale/es';
import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs';
import { Publicacion } from 'src/app/modelo/interfaces/publicacion';
import { ForoService } from 'src/app/service/foro.service';
import { PerfilUsuarioService } from 'src/app/service/perfil-usuario.service';

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

  constructor(private router: Router, private perfilUsuarioService: PerfilUsuarioService, private foroService:ForoService){}

  ngOnInit(): void {
    this.foroService.behaviorSubjectPublicaciones.pipe(takeUntil(this.onDestroy$)).subscribe(publicaciones =>{
      this.publicaciones = publicaciones;
    });
  }

  ngOnDestroy(): void {
    this.onDestroy$.next(true);
  }
  
  // cambiarPublicacionesPaginadas(){
  //   let nuevoArray = this.publicacionesPaginadas.filter(e => e.autor == "Cris123");
  //   console.log(nuevoArray);
  // }

  get publicacionesPaginadas() {
    const inicio = (this.paginaActual - 1) * this.cantMostrarPublicaciones;
    const fin = inicio + this.cantMostrarPublicaciones;

    return this.publicaciones?.slice(inicio, fin);
  }

  redirigirAPublicacion(idPublicacion: number) {
    this.router.navigate(['/publicacion', idPublicacion]);
  }

  calcularAntiguedadFecha(fecha: Date) {
    let date = new Date(fecha);
    return formatDistance(date, new Date(), { locale: es });
  }

  redirigirAPerfilUsuario(nombreUsuario: string) {
    let nombreUsuarioActual;

    this.perfilUsuarioService.getNombreUsuarioActual.subscribe(
      (nombreUsuarioSub) => {
        nombreUsuarioActual = nombreUsuarioSub;
      }
    );

    if (nombreUsuarioActual != nombreUsuario) {
      this.perfilUsuarioService.setPerfilUsuario = null;
      this.perfilUsuarioService.setNombreUsuarioActual = nombreUsuario;
    }

    this.router.navigate(['/bp-perfil', nombreUsuario]);
  }
}
