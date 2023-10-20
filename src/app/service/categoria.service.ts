import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CategoriaDTO } from '../dto/categoria-dto';
import { Categoria } from '../modelo/interfaces/categoria';
import { EnumEndpoints } from '../shared/enum-endpoints';
import { Publicacion } from '../modelo/interfaces/publicacion';
import { ca } from 'date-fns/locale';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private categorias:BehaviorSubject<Categoria[]> = new BehaviorSubject<Categoria[]>([]);
  private publicacionesCategoria:BehaviorSubject<Publicacion[]> = new BehaviorSubject<Publicacion[]>([]);

  constructor(private http:HttpClient) {
    this.obtenerCategorias().subscribe((categorias:Categoria[]) => {
      this.categorias.next(categorias);
    })
  }
  set setPublicaciones(publicaciones:Publicacion[]){
    this.publicacionesCategoria.next(publicaciones);
  }

  publicacionesDeCategoria(categoria:string){
    this.obtenerPublicacionesDeCategoria(categoria).subscribe( (publicaciones:Publicacion[]) =>{
      this.publicacionesCategoria.next(publicaciones);
    })
  }
  filtrarPorPalabra(palabra:string){
    return this.publicacionesCategoria.value.filter(publicacion => publicacion.titulo.toLocaleLowerCase().includes(palabra.toLocaleLowerCase()));
  }
  get publicaciones():Observable<Publicacion[]>{
    return this.publicacionesCategoria.asObservable();
  }
  get categoriasObservable():Observable<Categoria[]>{
    return this.categorias.asObservable();
  }
  actualizarCategoria(id:number, nuevoNombre:string, nuevaDescripcion:string){
    let categoriaIndice = this.encontrarIndice(id);

    this.categorias.value[categoriaIndice].nombre = nuevoNombre;
    this.categorias.value[categoriaIndice].descripcion = nuevaDescripcion;
  }
  cambiarEstadoCategoria(idCategoria:number){
  
    let categoriaIndice = this.encontrarIndice(idCategoria);

    this.categorias.value[categoriaIndice].habilitado
     ? 
     this.categorias.value[categoriaIndice].habilitado = false 
     : 
     this.categorias.value[categoriaIndice].habilitado = true;
  }

  encontrarIndice(id:number){
    return this.categorias.value.findIndex(categoria => categoria.id == id);
  }

  filtrarCategoria(id:number){
    let nuevaListaCategorias = this.categorias.value.filter(categoria => categoria.id != id);

    this.categorias.next(nuevaListaCategorias);
  }
  añadirCategoria(categoria:Categoria){
    this.categorias.value.push(categoria);
  }


  //PETICIONES
  obtenerPublicacionesDeCategoria(nombreCategoria:string):Observable<Publicacion[]>{
    return this.http.get<Publicacion[]>(`${EnumEndpoints.obtenerPublicacionesDeCategoria}/${nombreCategoria}`);
  }
  cambiarEstado(id:number):Observable<void>{
    return this.http.post<void>(`${EnumEndpoints.cambiarEstadoCategoria}/${id}`, "");
  }
  obtenerCategorias():Observable<Categoria[]>{
    return this.http.get<Categoria[]>(EnumEndpoints.obtenerCategorias);
  }
  crearCategoria(nuevaCategoria:CategoriaDTO):Observable<Categoria>{
    return this.http.post<Categoria>(EnumEndpoints.crearCategoria, nuevaCategoria);
  }
  editarCategoria(id:number, formData:FormData):Observable<void>{
    return this.http.put<void>(`${EnumEndpoints.editarCategoria}/${id}`, formData);
  }
  eliminarCategoria(id:number):Observable<void>{
    return this.http.delete<void>(`${EnumEndpoints.eliminarCategoria}/${id}`);
  }
}
