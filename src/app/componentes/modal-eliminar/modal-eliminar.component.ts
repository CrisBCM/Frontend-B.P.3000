import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ForoService } from 'src/app/service/foro.service';

@Component({
  selector: 'app-modal-eliminar',
  templateUrl: './modal-eliminar.component.html',
  styleUrls: ['./modal-eliminar.component.css']
})
export class ModalEliminarComponent {
  @Input() tituloModal:String = "";
  @Input() mensajeModal:String = "";
  @Output() confirmarEliminar = new EventEmitter<void>;
  @Output() cerrarModal = new EventEmitter<boolean>;
  constructor(private foroService:ForoService){

  }

  confirmar(){
    this.confirmarEliminar.emit();
  }
  cerrar(){
    this.cerrarModal.emit(false);
  }
  
}
