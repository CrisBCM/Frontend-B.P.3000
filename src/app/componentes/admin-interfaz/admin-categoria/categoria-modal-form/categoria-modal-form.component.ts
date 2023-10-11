import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoriaDTO } from 'src/app/dto/categoria-dto';
import { Categoria } from 'src/app/modelo/interfaces/categoria';
import { CategoriaService } from 'src/app/service/categoria.service';

@Component({
  selector: 'app-categoria-modal-form',
  templateUrl: './categoria-modal-form.component.html',
  styleUrls: ['./categoria-modal-form.component.css']
})
export class CategoriaModalFormComponent {
  @Input() tituloModal:string = "";
  @Input() categoriaEditar!:Categoria;
  @Input() switchEditar:boolean = false;
  @Output() emitCerrar = new EventEmitter<boolean>;
  @Input() categoriaNombre:string = "";
  @Input() categoriaDescripcion:string = "";
  @Output() emitEditar = new EventEmitter<CategoriaDTO>;

  constructor(private fb:FormBuilder, private categoriaService:CategoriaService){

  }
  form = this.fb.group({
    'nombre':["", Validators.required],
    'descripcion':["", Validators.required]
  })

  get nombre(){
    return this.form.get("nombre") as FormControl;
  }
  get descripcion(){
    return this.form.get("descripcion") as FormControl;
  }

  crearCategoria(){
    const nuevaCategoria:CategoriaDTO = {
      "nombre" : this.nombre.value,
      "descripcion" : this.descripcion.value
    }

    this.categoriaService.crearCategoria(nuevaCategoria).subscribe((categoria:Categoria)=>{
      this.categoriaService.añadirCategoria(categoria);
      this.emitCerrar.emit(false);
    })
  }
  emitEditarCategoria(){
    const categoria:CategoriaDTO = {
      "nombre": this.categoriaNombre,
      "descripcion": this.categoriaDescripcion
    };

    this.emitEditar.emit(categoria);
  }
  
}
