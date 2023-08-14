import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { EnumEndpoints } from '../shared/enum-endpoints';
import { IComentario, IPublicacion, IPublicacionForm, IRespuesta} from '../modelo/interfaces/IPublicacion';

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
  set actualizarPublicaciones(nuevaListaPublicaciones:IPublicacion[] | null){
    this.publicaciones$.next(nuevaListaPublicaciones);
  }

  obtenerPosts():Observable<IPublicacion[]>{
    return this.http.get<IPublicacion[]>(EnumEndpoints.obtenerPosts);
  }
  publicar(idUsuario:number, publicacion:IPublicacionForm):Observable<IPublicacion>{
    return this.http.post<IPublicacion>(`${EnumEndpoints.publicar}/${idUsuario}`, publicacion);
  }
  enviarComentario(idPublicacion:number, idAutor:number, contenido:any):Observable<IComentario>{
    return this.http.post<IComentario>(`${EnumEndpoints.enviarComentario}/${idPublicacion}/${idAutor}`, contenido);
  }
  responderComentario(idComentario:number, idAutor:number, contenido:any):Observable<IRespuesta>{
    return this.http.post<IRespuesta>(`${EnumEndpoints.añadirRespuesta}/${idComentario}/${idAutor}`, contenido);
  }
  eliminarComentario(idComentario:number):Observable<any>{
    return this.http.delete(`${EnumEndpoints.eliminarComentario}/${idComentario}`);
  }
  eliminarRespuesta(idRespuesta:number):Observable<any>{
    return this.http.delete(`${EnumEndpoints.eliminarRespuesta}/${idRespuesta}`, { responseType: "text" });
  }
  editarRespuesta(idRespuesta:number, contenido:any):Observable<IRespuesta>{
    return this.http.put<IRespuesta>(`${EnumEndpoints.editarRespuesta}/${idRespuesta}`, contenido);
  }
  editarComentario(idComentario:number, contenido:any):Observable<IComentario>{
    return this.http.put<IComentario>(`${EnumEndpoints.editarComentario}/${idComentario}`, contenido);
  }
  meGusta(url:string, idComentarioORespuesta:number, nombreUsuario:string):Observable<any>{
    return this.http.put(`${url}/${idComentarioORespuesta}/${nombreUsuario}`,"");
  }
  noMeGusta(url:string, idComentarioORespuesta:number, nombreUsuario:string):Observable<any>{
    return this.http.put(`${url}/${idComentarioORespuesta}/${nombreUsuario}`, "");
  }
}
