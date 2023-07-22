import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Publicacion } from 'src/app/modelo/clases/publicacion';
import { ForoService } from 'src/app/service/foro.service';
import { LoginServiceService } from 'src/app/service/login-service.service';

@Component({
  selector: 'app-form-publicacion',
  templateUrl: './form-publicacion.component.html',
  styleUrls: ['./form-publicacion.component.css']
})
export class FormPublicacionComponent {

  tokenDecode:any;

  idUsuario:number;

  constructor(private fb:FormBuilder, private foroService:ForoService, private loginService:LoginServiceService){

    this.tokenDecode = loginService.tokenDecoded;

    this.idUsuario = this.tokenDecode.persona_id;

  }
  form = this.fb.group({
    'titulo':["", [Validators.required, Validators.maxLength(300)]],
    'tema':["Tema", Validators.required],
    'contenido':["", [Validators.required, Validators.minLength(3), Validators.maxLength(3000)]]
  });

  get titulo(){
      return this.form.get("titulo")?.value;
  }
  get tema(){
    if(this.form.get("tema")?.value == null) 
      return;

    return this.form.get("tema")?.value;
  }
  get contenido(){
    if(this.form.get("contenido")?.value == null) 
      return;
    return this.form.get("contenido")?.value;
  }

  // nuevaPublicacion(){
    
  //   let publicacion:Publicacion;

  //   if(this.titulo && this.tema && this.contenido){
      
  //      publicacion = new Publicacion(this.titulo , this.tema, this.contenido, new Date());
  //   }
  //   return publicacion;
  // }


  errorPublicar(){
    console.log("ERROR AL PUBLICAR!");
    return;
  }

  publicar(){
    if(!this.form.valid) this.errorPublicar;

    const publicacion:Publicacion = new Publicacion(this.titulo ?? "", this.contenido ?? "", this.tema ?? "", new Date());

    console.log(publicacion);
    
    this.foroService.publicar(this.idUsuario, publicacion).subscribe(nuevaPublicacion =>{
      console.log(nuevaPublicacion);
    })
  }
}

