import { Component, Input } from '@angular/core';
import { Categoria } from 'src/app/modelo/interfaces/categoria';

@Component({
  selector: 'app-categoria-modal-form',
  templateUrl: './categoria-modal-form.component.html',
  styleUrls: ['./categoria-modal-form.component.css']
})
export class CategoriaModalFormComponent {
  @Input() tituloModal:string = "Crear categoria";
  @Input() categoriaEditar!:Categoria;
  @Input() switchEditar:boolean = false;
  constructor(){}
}
