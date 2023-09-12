import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-form-editar-comentario-respuesta',
  templateUrl: './form-editar-comentario-respuesta.component.html',
  styleUrls: ['./form-editar-comentario-respuesta.component.css']
})
export class FormEditarComentarioRespuestaComponent {
  @Input() contenidoTemp:string = "";
  @Output() cerrarEditar = new EventEmitter<boolean>;
  @Output() confirmarEditar = new EventEmitter<void>;
  @Output() contenidoFinal = new EventEmitter<string>;
  constructor(){}

  emitCerrarEditar(){
    this.cerrarEditar.emit(false);
  }
  emitConfirmarEditar(){
    this.contenidoFinal.emit(this.contenidoTemp);
    this.confirmarEditar.emit();
  }
  mostrarContenido(){
    console.log(this.contenidoTemp);
  }
}
