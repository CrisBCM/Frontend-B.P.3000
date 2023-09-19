import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject, takeUntil } from 'rxjs';
import { ForoService } from 'src/app/service/foro.service';
import { formatDistance } from 'date-fns';
import { es } from 'date-fns/locale';
import { Publicacion } from 'src/app/modelo/interfaces/publicacion';
import { PerfilUsuarioService } from 'src/app/service/perfil-usuario.service';

@Component({
  selector: 'app-foro-main',
  templateUrl: './foro-main.component.html',
  styleUrls: ['./foro-main.component.css'],
})
export class ForoMainComponent implements OnInit{
  publicaciones$: Observable<Publicacion[] | null>;
  paginaSeleccionada:string = "general";
  // publicaciones!: Publicacion[] | null;
  // paginaActual: number = 1;
  // cantMostrarPublicaciones: number = 5;

  constructor(
    private foroService: ForoService,
    // private router: Router,
    private perfilUsuarioService: PerfilUsuarioService
  ) {
    this.publicaciones$ = this.foroService.behaviorSubjectPublicaciones;
  }
  ngOnInit(): void {
    // this.publicaciones$
    //   .pipe(takeUntil(this.onDestroy$))
    //   .subscribe((publicaciones) => {
    //     this.publicaciones = publicaciones;
    //   });
  }

  // get publicacionesPaginadas() {
  //   const inicio = (this.paginaActual - 1) * this.cantMostrarPublicaciones;
  //   const fin = inicio + this.cantMostrarPublicaciones;

  //   return this.publicaciones?.slice(inicio, fin);
  // }

  // redirigirAPublicacion(idPublicacion: number) {
  //   this.router.navigate(['/publicacion', idPublicacion]);
  // }

  // calcularAntiguedadFecha(fecha: Date) {
  //   let date = new Date(fecha);
  //   return formatDistance(date, new Date(), { locale: es });
  // }

  // redirigirAPerfilUsuario(nombreUsuario: string) {
  //   let nombreUsuarioActual;

  //   this.perfilUsuarioService.getNombreUsuarioActual.subscribe(
  //     (nombreUsuarioSub) => {
  //       nombreUsuarioActual = nombreUsuarioSub;
  //     }
  //   );

  //   if (nombreUsuarioActual != nombreUsuario) {
  //     this.perfilUsuarioService.setPerfilUsuario = null;
  //     this.perfilUsuarioService.setNombreUsuarioActual = nombreUsuario;
  //   }

  //   this.router.navigate(['/bp-perfil', nombreUsuario]);
  // }
}
