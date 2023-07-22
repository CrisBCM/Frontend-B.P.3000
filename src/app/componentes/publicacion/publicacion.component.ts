import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable, map } from 'rxjs';
import { IComentario, IPublicacion } from 'src/app/modelo/interfaces/IPublicacion';
import { ForoService } from 'src/app/service/foro.service';

@Component({
  selector: 'app-publicacion',
  templateUrl: './publicacion.component.html',
  styleUrls: ['./publicacion.component.css']
})
export class PublicacionComponent{
  idPublicacion!:number;
  publicacion!:IPublicacion;
  publicaciones$:Observable<IPublicacion[] | null>;

  constructor(private activdeRoute:ActivatedRoute, private foroService:ForoService){
    activdeRoute.params.subscribe((params:Params) =>{
      this.idPublicacion = params["idPublicacion"];
    })

    this.publicaciones$ = foroService.behaviorSubjectPublicaciones;
    
    this.publicaciones$
    .pipe(map(publicaciones => publicaciones?.filter(publicacion => publicacion.id == this.idPublicacion)))
    .subscribe(arrayPublicacionFiltrada =>{
      if(arrayPublicacionFiltrada != null){
        this.publicacion = arrayPublicacionFiltrada[0];
      }
    })
  }

  anadirComentario(comentario:IComentario){
    this.publicacion.comentarios.push(comentario);
  }
}
