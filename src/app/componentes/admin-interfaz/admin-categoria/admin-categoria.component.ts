import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoriaDTO } from 'src/app/dto/categoria-dto';
import { Categoria } from 'src/app/modelo/interfaces/categoria';
import { CategoriaService } from 'src/app/service/categoria.service';

@Component({
  selector: 'app-admin-categoria',
  templateUrl: './admin-categoria.component.html',
  styleUrls: ['./admin-categoria.component.css']
})
export class AdminCategoriaComponent {
  switchCrear:boolean = false;
  categorias$!:Observable<Categoria[]>;
  switchEliminar:boolean = false;
  switchEditar:boolean = false;
  idCategoria!:number;
  categoria!:CategoriaDTO;

  constructor(private categoriaService:CategoriaService){
    this.categorias$ = categoriaService.categoriasObservable;
  }
  cambiarEstadoCategoria(){
    this.categoriaService.cambiarEstado(this.idCategoria).subscribe(()=>{
    })
    this.categoriaService.cambiarEstadoCategoria(this.idCategoria);
  }
  elegirCategoria(id:number, categoria:CategoriaDTO){
    this.idCategoria = id;
    this.categoria = categoria;
  }

  editarCategoria(categoria:CategoriaDTO){
    const formData = new FormData();

    formData.append("nuevoNombre", categoria.nombre);
    formData.append("nuevaDescripcion", categoria.descripcion);

    this.categoriaService.editarCategoria(this.idCategoria, formData).subscribe(()=>{
      this.categoriaService.actualizarCategoria(this.idCategoria, categoria.nombre, categoria.descripcion);
      this.switchEditar = false;
    })
  }

  eliminarCategoria(){
    this.categoriaService.eliminarCategoria(this.idCategoria).subscribe(()=>{
      this.categoriaService.filtrarCategoria(this.idCategoria);
      this.switchEliminar = false;
    })
  }

}
