import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Publicacion } from 'src/app/modelo/interfaces/publicacion';
import { ForoService } from 'src/app/service/foro.service';
import { PublicacionService } from 'src/app/service/publicacion.service';

@Component({
  selector: 'app-modal-editar',
  templateUrl: './modal-editar.component.html',
  styleUrls: ['./modal-editar.component.css']
})
export class ModalEditarComponent implements OnInit{
  publicacion$:Observable<Publicacion | null>;
  publicacion!:Publicacion;
  formEditar!:FormGroup;
  onDestroy$:Subject<Boolean> = new Subject();
  @Output() switchEditarPublicacion = new EventEmitter<boolean>;
  @Output() nuevaPublicacion = new EventEmitter<Publicacion>;

  constructor(private formBuilder:FormBuilder, private publicacionService:PublicacionService, private foroService:ForoService){
    this.publicacion$ = publicacionService.getPublicacion
  }

  ngOnInit(): void {
    this.formEditar = this.formBuilder.group({
      "titulo":["", [Validators.required, Validators.minLength(4)]],
      "contenido":["", [Validators.required, Validators.minLength(4)]]
    })

    this.publicacion$.pipe(takeUntil(this.onDestroy$)).subscribe(publicacion =>{
      
      if(publicacion) this.publicacion = publicacion;

      this.formEditar.setValue({titulo: this.publicacion.titulo, contenido: this.publicacion.contenido});
    })
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
      console.log(JSON.stringify(publicacion) + " PUBLICACIONNNNNNS");
      this.nuevaPublicacion.emit(publicacion);
      this.switchEditarPublicacion.emit(false);
    })
  }


}
