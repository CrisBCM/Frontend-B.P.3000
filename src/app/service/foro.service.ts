import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { EnumEndpoints } from '../shared/enum-endpoints';
import { Publicacion } from '../modelo/interfaces/publicacion';
import { Comentario } from '../modelo/interfaces/comentario';
import { Respuesta } from '../modelo/interfaces/respuesta';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class ForoService {

  publicaciones$:BehaviorSubject<Publicacion[] | null> = new BehaviorSubject<Publicacion[] | null>(null);;

  constructor(private http:HttpClient, private router:Router) {

    this.obtenerPosts().subscribe((arrayPublicacion:Publicacion[]) =>{
      console.log(arrayPublicacion);

      this.publicaciones$.next(arrayPublicacion.sort((publicacionA, publicacionB) => new Date(publicacionB.fecha).getTime() - new Date(publicacionA.fecha).getTime()));
    }) 
    
  }
  
  recalcularPuntuacionPublicacion(indicePublicacion:number){
    if(this.publicaciones$.value){
      this.publicaciones$.value[indicePublicacion].puntuacion = this.publicaciones$.value[indicePublicacion].listaMeGusta.length - this.publicaciones$.value[indicePublicacion].listaNoMeGusta.length;
    }
  }
  setMeGustaPublicacion(idPublicacion:number, nombreUsuario:string){
    if(this.publicaciones$.value){

      let indicePublicacion = this.obtenerIndicePublicacion(idPublicacion);

      if(!this.publicaciones$.value[indicePublicacion].listaMeGusta.includes(nombreUsuario)){

        if(this.publicaciones$.value[indicePublicacion].listaNoMeGusta.includes(nombreUsuario)){
          let indiceUsuarioNoMeGusta = this.publicaciones$.value[indicePublicacion].listaNoMeGusta.findIndex(nombre => nombre == nombreUsuario);
          this.publicaciones$.value[indicePublicacion].listaNoMeGusta.splice(indiceUsuarioNoMeGusta, 1);
        }

        this.publicaciones$.value[indicePublicacion].listaMeGusta.push(nombreUsuario);

      }else{
        let indiceUsuarioMeGusta = this.publicaciones$.value[indicePublicacion].listaMeGusta.findIndex(nombre => nombre == nombreUsuario);

        this.publicaciones$.value[indicePublicacion].listaMeGusta.splice(indiceUsuarioMeGusta, 1);
      }
      this.recalcularPuntuacionPublicacion(indicePublicacion);
    }
  }

  setPublicacionNoMeGusta(idPublicacion:number, nombreUsuario:string){
    if(this.publicaciones$.value){

      let indicePublicacion = this.obtenerIndicePublicacion(idPublicacion);

      if(!this.publicaciones$.value[indicePublicacion].listaNoMeGusta.includes(nombreUsuario)){

        if(this.publicaciones$.value[indicePublicacion].listaMeGusta.includes(nombreUsuario)){
          let indiceUsuarioMeGusta = this.publicaciones$.value[indicePublicacion].listaMeGusta.findIndex(nombre => nombre == nombreUsuario);
          this.publicaciones$.value[indicePublicacion].listaMeGusta.splice(indiceUsuarioMeGusta, 1);
        }

        this.publicaciones$.value[indicePublicacion].listaNoMeGusta.push(nombreUsuario);
        
      }else{
        let indiceUsuarioNoMeGusta = this.publicaciones$.value[indicePublicacion].listaNoMeGusta.findIndex(nombre => nombre == nombreUsuario);

        this.publicaciones$.value[indicePublicacion].listaNoMeGusta.splice(indiceUsuarioNoMeGusta, 1);
      }
      this.recalcularPuntuacionPublicacion(indicePublicacion);
    }

    
  }

  filtrarPorMasNuevo(array:Publicacion[] | null){
    return array?.sort((a,b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime());
  }
  filtrarPorMasAntiguo(array:Publicacion[] | null){
    return array?.sort((a,b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime());
  }
  filtrarPorMasGustado(array:Publicacion[] | null){
    return array?.sort((a,b) => b.puntuacion - a.puntuacion);
  }

  get publicacionesAntiguas(){
    return this.filtrarPorMasAntiguo(this.publicaciones$.value);
  }
  get publicacionesMasGustado(){
    return this.filtrarPorMasGustado(this.publicaciones$.value);
  }
  get publicacionesMasNuevas(){
    return this.filtrarPorMasNuevo(this.publicaciones$.value);
  }

  get behaviorSubjectPublicaciones():Observable<Publicacion[] | null>{
    return this.publicaciones$.asObservable();
  }
  set actualizarPublicaciones(nuevaListaPublicaciones:Publicacion[] | null){
    this.publicaciones$.next(nuevaListaPublicaciones);
  }
  set publicacionEditada(publicacion:Publicacion){
      if(this.publicaciones$.value){
      let indexPubli = this.publicaciones$.value.findIndex(publi => publi.id = publicacion.id);
      this.publicaciones$.value[indexPubli] = publicacion;
    }
  }
  set añadirPublicacion(nuevaPublicacion:Publicacion){
    if(this.publicaciones$.value){
      this.publicaciones$.value.push(nuevaPublicacion);
    }
  }
  redirigirAPublicacion(idPublicacion:number){
    this.router.navigate(["/publicacion", idPublicacion]);
  }
  obtenerIndicePublicacion(idPublicacion:number):number{
    let indicePublicacion:number = 0;
    if(this.publicaciones$.value){
      indicePublicacion = this.publicaciones$.value.findIndex(publicacion => publicacion.id == idPublicacion);
    }
    return indicePublicacion;
  }
  seteliminarComentario(idComentario:number, idPublicacion:number){
    if(this.publicaciones$.value){
      let indicePublicacion = this.obtenerIndicePublicacion(idPublicacion);
      let nuevoArrayComentarios = this.publicaciones$.value[indicePublicacion].comentarios.filter(comentario => comentario.id != idComentario);
      this.publicaciones$.value[indicePublicacion].comentarios = nuevoArrayComentarios;
    }
  }
  setEliminarRespuesta(idRespuesta:number, idPublicacion:number, idComentario:number){
    if(this.publicaciones$.value){
      let indicePublicacion = this.obtenerIndicePublicacion(idPublicacion);
      let indiceComentario = this.publicaciones$.value[indicePublicacion].comentarios.findIndex(comentario => comentario.id == idComentario);

      let nuevoArrayRespuestas = this.publicaciones$.value[indicePublicacion].comentarios[indiceComentario].respuestas.filter(respuesta => respuesta.id != idRespuesta);
      this.publicaciones$.value[indicePublicacion].comentarios[indiceComentario].respuestas = nuevoArrayRespuestas;
    }
  }
  setEditarComentario(idPublicacion:number, nuevoComentario:Comentario){
    if(this.publicaciones$.value){
      let indicePublicacion = this.obtenerIndicePublicacion(idPublicacion);
      let indiceComentario = this.publicaciones$.value[indicePublicacion].comentarios.findIndex(comentario => comentario.id == nuevoComentario.id);
      
      this.publicaciones$.value[indicePublicacion].comentarios[indiceComentario] = nuevoComentario;
    }
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
  publicacionMeGusta(idPublicacion:number, nombreUsuario:string):Observable<any>{
    return this.http.put(`${EnumEndpoints.publicacionVotarMeGusta}/${idPublicacion}/${nombreUsuario}`, "");
  }
  publicacionNoMeGusta(idPublicacion:number, nombreUsuario:string):Observable<any>{
    return this.http.put(`${EnumEndpoints.publicacionVotarNoMeGusta}/${idPublicacion}/${nombreUsuario}`, "");
  }
}
