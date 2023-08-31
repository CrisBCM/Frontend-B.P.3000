import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { EnumEndpoints } from '../shared/enum-endpoints';
import { Publicacion } from '../modelo/interfaces/publicacion';
import { Comentario } from '../modelo/interfaces/comentario';
import { Respuesta } from '../modelo/interfaces/respuesta';


@Injectable({
  providedIn: 'root'
})
export class ForoService {

  publicaciones$:BehaviorSubject<Publicacion[] | null> = new BehaviorSubject<Publicacion[] | null>(null);;

  constructor(private http:HttpClient) {

    this.obtenerPosts().subscribe(arrayPublicacion =>{
      console.log(arrayPublicacion);

      this.publicaciones$.next(arrayPublicacion);
    }) 
    
  }

  get behaviorSubjectPublicaciones():Observable<Publicacion[] | null>{
    return this.publicaciones$.asObservable();
  }
  set actualizarPublicaciones(nuevaListaPublicaciones:Publicacion[] | null){
    this.publicaciones$.next(nuevaListaPublicaciones);
  }

  obtenerPosts():Observable<Publicacion[]>{
    return this.http.get<Publicacion[]>(EnumEndpoints.obtenerPosts);
  }
  publicar(idUsuario:number, publicacion:any):Observable<Publicacion>{
    return this.http.post<Publicacion>(`${EnumEndpoints.publicar}/${idUsuario}`, publicacion);
  }
  editarPublicacion(idPublicacion:number, formEditar:any):Observable<Publicacion>{
    return this.http.put<Publicacion>(`${EnumEndpoints.editarPublicacion}/${idPublicacion}`,formEditar);
  }
  eliminarPublicacion(idPublicacion:number):Observable<any>{
    return this.http.delete(`${EnumEndpoints.eliminarPublicacionn}/${idPublicacion}`, { responseType: "text" });
  }
  enviarComentario(idPublicacion:number, idAutor:number, contenido:any):Observable<Comentario>{
    return this.http.post<Comentario>(`${EnumEndpoints.enviarComentario}/${idPublicacion}/${idAutor}`, contenido);
  }
  responderComentario(idComentario:number, idAutor:number, contenido:any):Observable<Respuesta>{
    return this.http.post<Respuesta>(`${EnumEndpoints.añadirRespuesta}/${idComentario}/${idAutor}`, contenido);
  }
  eliminarComentario(idComentario:number):Observable<any>{
    return this.http.delete(`${EnumEndpoints.eliminarComentario}/${idComentario}`);
  }
  eliminarRespuesta(idRespuesta:number):Observable<any>{
    return this.http.delete(`${EnumEndpoints.eliminarRespuesta}/${idRespuesta}`, { responseType: "text" });
  }
  editarRespuesta(idRespuesta:number, contenido:any):Observable<Respuesta>{
    return this.http.put<Respuesta>(`${EnumEndpoints.editarRespuesta}/${idRespuesta}`, contenido);
  }
  editarComentario(idComentario:number, contenido:any):Observable<Comentario>{
    return this.http.put<Comentario>(`${EnumEndpoints.editarComentario}/${idComentario}`, contenido);
  }
  meGusta(url:string, idComentarioORespuesta:number, nombreUsuario:string):Observable<any>{
    return this.http.put(`${url}/${idComentarioORespuesta}/${nombreUsuario}`,"");
  }
  noMeGusta(url:string, idComentarioORespuesta:number, nombreUsuario:string):Observable<any>{
    return this.http.put(`${url}/${idComentarioORespuesta}/${nombreUsuario}`, "");
  }
}
