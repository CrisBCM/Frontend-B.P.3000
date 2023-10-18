import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { ForoService } from 'src/app/service/foro.service';
import { SpinnerService } from 'src/app/service/spinner.service';

@Component({
  selector: 'app-modal-eliminar',
  templateUrl: './modal-eliminar.component.html',
  styleUrls: ['./modal-eliminar.component.css']
})
export class ModalEliminarComponent implements OnInit, OnDestroy{
  @Input() tituloModal:String = "";
  @Input() mensajeModal:String = "";
  @Output() confirmarEliminar = new EventEmitter<void>;
  @Output() cerrarModal = new EventEmitter<boolean>;
  spinner:boolean = false;
  onDestroy$:Subject<boolean> = new Subject();
  constructor(private foroService:ForoService, private spinnerService:SpinnerService){

  }
  ngOnInit(): void {
    this.spinnerService.obtenerSpinner.pipe(takeUntil(this.onDestroy$)).subscribe((spinner:boolean)=>{
      this.spinner = spinner;
    })
  }
  ngOnDestroy(): void {
    this.onDestroy$.next(true);
  }

  confirmar(){
    this.confirmarEliminar.emit();
  }
  cerrar(){
    this.cerrarModal.emit(false);
  }
  
}
