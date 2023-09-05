import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Publicacion } from 'src/app/modelo/interfaces/publicacion';
import { ForoService } from 'src/app/service/foro.service';
import { PublicacionService } from 'src/app/service/publicacion.service';
import { SharingService } from 'src/app/service/sharing.service';

@Component({
  selector: 'app-modal-editar',
  templateUrl: './modal-editar.component.html',
  styleUrls: ['./modal-editar.component.css']
})
export class ModalEditarComponent implements OnInit, OnDestroy{
  publicacion$:Observable<Publicacion | null>;
  publicacion!:Publicacion;
  formEditar!:FormGroup;
  onDestroy$:Subject<Boolean> = new Subject();
  @Output() switchEditarPublicacion = new EventEmitter<boolean>;
  @Output() nuevaPublicacion = new EventEmitter<Publicacion>;

  constructor(private formBuilder:FormBuilder, private publicacionService:PublicacionService, private foroService:ForoService, private sharingService:SharingService){
    this.publicacion$ = publicacionService.getPublicacion
  }
  
  ngOnInit(): void {
    this.formEditar = this.formBuilder.group({
      "titulo":["", [Validators.required, Validators.minLength(4)]],
      "contenido":["", [Validators.required, Validators.minLength(4)]]
    })
    
    if(this.publicacion$){

      this.publicacion$.pipe(takeUntil(this.onDestroy$)).subscribe(publicacion =>{
        
        if(publicacion) this.publicacion = publicacion;
        
        this.formEditar.setValue({titulo: this.publicacion.titulo, contenido: this.publicacion.contenido});
      })
      
    }
  }

  ngOnDestroy(): void {
    this.onDestroy$.next(true);
  }
  
  get titulo(){
    return this.formEditar.get("titulo") as FormControl;
  }
  get contenido(){
    return this.formEditar.get("contenido") as FormControl;
  }

  cerrarFormEditar(){
    this.switchEditarPublicacion.emit(false);
  }
  confirmarEditar(){
    let publicacionEditada = {
      titulo : this.titulo.value,
      contenido : this.contenido.value
    }

    this.foroService.editarPublicacion(this.publicacion.id, publicacionEditada).subscribe((publicacion:Publicacion) => {
      
      this.nuevaPublicacion.emit(publicacion);
      let onDestroy$:Subject<boolean> = new Subject();
      this.foroService.publicacionEditada = publicacion;
      this.sharingService.actualizarPublicacionesPersona = publicacion;
      this.switchEditarPublicacion.emit(false);
    })
  }


}
