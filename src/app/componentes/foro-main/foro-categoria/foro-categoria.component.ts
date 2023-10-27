import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Publicacion } from 'src/app/modelo/interfaces/publicacion';
import { CategoriaService } from 'src/app/service/categoria.service';
import { ForoService } from 'src/app/service/foro.service';
import { PerfilUsuarioService } from 'src/app/service/perfil-usuario.service';

@Component({
  selector: 'app-foro-categoria',
  templateUrl: './foro-categoria.component.html',
  styleUrls: ['./foro-categoria.component.css']
})
export class ForoCategoria implements OnInit, OnDestroy{
  onDestroy$:Subject<boolean> = new Subject();
  nombreCategoria:string = ""
  publicaciones:Publicacion[] = [];
  opcionesDeFiltro:string[] = ["Mas Nuevo","Antiguo", "Mas gustado"];
  nombreFiltroPorTema:string = "Mas Nuevo";
  constructor(private activatedRoute:ActivatedRoute, private categoriaService:CategoriaService, private perfilUsuarioService:PerfilUsuarioService, private router:Router){}

  ngOnInit(): void {
    this.activatedRoute.params.pipe(takeUntil(this.onDestroy$)).subscribe((param:Params) =>{
      this.nombreCategoria = param["categoria"];
     
    })

    this.categoriaService.publicacionesDeCategoria(this.nombreCategoria);

    this.categoriaService.publicaciones.pipe(takeUntil(this.onDestroy$)).subscribe((publicaciones:Publicacion[])=>{
      this.publicaciones = publicaciones;
    })
    
  }

  ngOnDestroy(): void {
   
    this.onDestroy$.next(true);
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
    this.publicaciones = this.categoriaService.filtrarPorPalabra(palabra);
  }
  filtrarPorMasGustado(){
    this.publicaciones = this.publicaciones.sort((a,b)=> b.puntuacion - a.puntuacion);
  }
  filtrarPorAntiguedad(){
    this.publicaciones = this.publicaciones.sort((a,b)=> new Date(a.fecha).getTime() - new Date(b.fecha).getTime());
  }
  filtrarPorMasNuevo(){
    this.publicaciones = this.publicaciones.sort((a,b)=> new Date(b.fecha).getTime() - new Date(a.fecha).getTime());
  }
  redirigirAPerfilUsuario(nombreUsuario: string) {
    this.perfilUsuarioService.redirigirAPerfilUsuario(nombreUsuario);
  }
  redirigirAPublicacion(idPublicacion: number) {
    this.router.navigate(['/publicacion', idPublicacion]);
  }
}
