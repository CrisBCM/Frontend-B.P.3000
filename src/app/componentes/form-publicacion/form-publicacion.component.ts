import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IPublicacion, IPublicacionForm } from 'src/app/modelo/interfaces/IPublicacion';
import { ForoService } from 'src/app/service/foro.service';
import { LoginServiceService } from 'src/app/service/login-service.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-form-publicacion',
  templateUrl: './form-publicacion.component.html',
  styleUrls: ['./form-publicacion.component.css']
})
export class FormPublicacionComponent {

  tokenDecode:any;

  idUsuario:number;

  constructor(private fb:FormBuilder, private foroService:ForoService, private tokenService:TokenService){

    tokenService.tokenDecoded$.subscribe(tokenDecoded =>{
      this.tokenDecode = tokenDecoded;
    })

    this.idUsuario = this.tokenDecode.persona_id;

  }
  form = this.fb.group({
    'titulo':["", [Validators.required, Validators.maxLength(300)]],
    'tema':["Tema", Validators.required],
    'contenido':["", [Validators.required, Validators.minLength(3), Validators.maxLength(3000)]]
  });

  get titulo(){
      return this.form.get("titulo") as FormControl;
  }
  get tema(){
 
    return this.form.get("tema") as FormControl;
  }
  get contenido(){
    return this.form.get("contenido") as FormControl;
  }


  errorPublicar(){
    console.log("ERROR AL PUBLICAR!");
    return;
  }

  publicar(){
    if(!this.form.valid) this.errorPublicar;

    const publicacion:IPublicacionForm = {
      titulo : this.titulo.value,
      tema: this.tema.value,
      contenido : this.contenido.value,
    }

    console.log(publicacion);
    
    this.foroService.publicar(this.idUsuario, publicacion).subscribe(nuevaPublicacion =>{
      console.log(nuevaPublicacion);
    })
  }
}

