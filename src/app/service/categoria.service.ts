import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CategoriaDTO } from '../dto/categoria-dto';
import { Categoria } from '../modelo/interfaces/categoria';
import { EnumEndpoints } from '../shared/enum-endpoints';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private categorias:BehaviorSubject<Categoria[]> = new BehaviorSubject<Categoria[]>([]);

  constructor(private http:HttpClient) {
    this.obtenerCategorias().subscribe((categorias:Categoria[]) => {
      this.categorias.next(categorias);
    })

  }

  get categoriasObservable():Observable<Categoria[]>{
    return this.categorias.asObservable();
  }
  
  cambiarEstadoCategoria(idCategoria:number){
  
    let categoriaIndice = this.categorias.value.findIndex(categoria => categoria.id == idCategoria);
    this.categorias.value[categoriaIndice].habilitado
     ? 
     this.categorias.value[categoriaIndice].habilitado = false 
     : 
     this.categorias.value[categoriaIndice].habilitado = true;
  }
  filtrarCategoria(id:number){
    let nuevaListaCategorias = this.categorias.value.filter(categoria => categoria.id != id);

    this.categorias.next(nuevaListaCategorias);
  }
  añadirCategoria(categoria:Categoria){
    this.categorias.value.push(categoria);
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
