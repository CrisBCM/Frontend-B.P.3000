import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { EnumEndpoints } from '../shared/enum-endpoints';
import { IComentario, IPublicacion} from '../modelo/interfaces/IPublicacion';
import { Publicacion } from '../modelo/clases/publicacion';

@Injectable({
  providedIn: 'root'
})
export class ForoService {

  publicaciones$:BehaviorSubject<IPublicacion[] | null> = new BehaviorSubject<IPublicacion[] | null>(null);;

  constructor(private http:HttpClient) {

    this.obtenerPosts().subscribe(arrayPublicacion =>{
      console.log(arrayPublicacion);

      this.publicaciones$.next(arrayPublicacion);
    }) 
    
  }

  get behaviorSubjectPublicaciones():Observable<IPublicacion[] | null>{
    return this.publicaciones$.asObservable();
  }

  obtenerPosts():Observable<IPublicacion[]>{
    return this.http.get<IPublicacion[]>(EnumEndpoints.obtenerPosts);
  }
  publicar(idUsuario:number, publicacion:Publicacion):Observable<IPublicacion>{
    return this.http.post<IPublicacion>(`${EnumEndpoints.publicar}/${idUsuario}`, publicacion);
  }
  enviarComentario(idPublicacion:number, idAutor:number, comentarioDto:any):Observable<IComentario>{
    return this.http.post<IComentario>(`${EnumEndpoints.enviarComentario}/${idPublicacion}/${idAutor}`, comentarioDto);
  }
}
