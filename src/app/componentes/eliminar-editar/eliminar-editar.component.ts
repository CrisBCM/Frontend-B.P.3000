import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-eliminar-editar',
  templateUrl: './eliminar-editar.component.html',
  styleUrls: ['./eliminar-editar.component.css']
})
export class EliminarEditarComponent {
  editarSwitch:boolean = false;
  tempContenido:string = "";
  @Input() esComentario!:boolean;
  @Input() respuestaContenido!:string;
  
  constructor(){

  }

  switchEdicion(){
    this.editarSwitch = true;
    this.tempContenido = this.respuestaContenido;
  }
}
