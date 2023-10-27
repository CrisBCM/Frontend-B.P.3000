import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subject, takeUntil } from 'rxjs';
import { CategoriaResumenDTO } from 'src/app/dto/categoria-resumen-dto';
import { ForoService } from 'src/app/service/foro.service';
import { LoginServiceService } from 'src/app/service/login-service.service';
import { SpinnerService } from 'src/app/service/spinner.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-form-publicacion',
  templateUrl: './form-publicacion.component.html',
  styleUrls: ['./form-publicacion.component.css']
})
export class FormPublicacionComponent implements OnInit, OnDestroy{

  tokenDecode:any;

  idUsuario!:number;

  spinner!:boolean;

  onDestroy$:Subject<boolean> = new Subject();

  categorias$!:Observable<CategoriaResumenDTO[]>;

  constructor(private fb:FormBuilder, private foroService:ForoService, private tokenService:TokenService, private spinnerService:SpinnerService){}

  ngOnInit(): void {
    this.tokenService.tokenDecoded$.pipe(takeUntil(this.onDestroy$)).subscribe(tokenDecoded =>{
      this.tokenDecode = tokenDecoded;
    })

    this.idUsuario = this.tokenDecode.persona_id;

    this.spinnerService.obtenerSpinner.pipe(takeUntil(this.onDestroy$)).subscribe(data =>{
      this.spinner = data;
    })

    this.categorias$ = this.foroService.categoriasAsObservable;
  }

  ngOnDestroy(): void {
    this.onDestroy$.next(true);
  }

  form = this.fb.group({
    'titulo':["", [Validators.required, Validators.maxLength(300)]],
    'categoria':["Categoria", Validators.required],
    'contenido':["", [Validators.required, Validators.minLength(3), Validators.maxLength(3000)]]
  });

  get titulo(){
      return this.form.get("titulo") as FormControl;
  }
  get categoria(){
 
    return this.form.get("categoria") as FormControl;
  }
  get contenido(){
    return this.form.get("contenido") as FormControl;
  }


  errorPublicar(){
   
    return;
  }

  publicar(){
    if(!this.form.valid) this.errorPublicar;

    const publicacion:any = {
      titulo : this.titulo.value,
      categoria: this.categoria.value,
      contenido : this.contenido.value,
    }

   
    
    this.foroService.publicar(this.idUsuario, publicacion).subscribe(nuevaPublicacion =>{
     
      this.form.reset();
      this.foroService.añadirPublicacion = nuevaPublicacion;
      this.foroService.redirigirAPublicacion(nuevaPublicacion.id);
    })
  }
}

