import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject, takeUntil } from 'rxjs';
import { ForoService } from 'src/app/service/foro.service';
import { formatDistance } from 'date-fns';
import { es } from 'date-fns/locale';
import { Publicacion } from 'src/app/modelo/interfaces/publicacion';
import { PerfilUsuarioService } from 'src/app/service/perfil-usuario.service';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-foro-main',
  templateUrl: './foro-main.component.html',
  styleUrls: ['./foro-main.component.css'],
})
export class ForoMainComponent implements OnInit{
  publicaciones$: Observable<Publicacion[] | null>;

  constructor(
    private foroService: ForoService,
    public router: Router,
  ) {
    this.publicaciones$ = this.foroService.behaviorSubjectPublicaciones;
  }
  ngOnInit(): void {}
}
