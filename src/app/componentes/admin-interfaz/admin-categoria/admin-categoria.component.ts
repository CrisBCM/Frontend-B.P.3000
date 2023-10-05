import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Categoria } from 'src/app/modelo/interfaces/categoria';
import { CategoriaService } from 'src/app/service/categoria.service';

@Component({
  selector: 'app-admin-categoria',
  templateUrl: './admin-categoria.component.html',
  styleUrls: ['./admin-categoria.component.css']
})
export class AdminCategoriaComponent {
  modalSwitch:boolean = false;
  categorias$!:Observable<Categoria[]>;
  switchEliminar:boolean = false;
  idCategoria!:number;

  constructor(private categoriaService:CategoriaService){
    this.categorias$ = categoriaService.categoriasObservable;
  }

  eliminarCategoria(){
    this.categoriaService.eliminarCategoria(this.idCategoria).subscribe(()=>{
      this.categoriaService.filtrarCategoria(this.idCategoria);
      this.switchEliminar = false;
    })
  }

}
