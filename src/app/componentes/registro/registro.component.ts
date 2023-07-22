import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegistroPersona } from 'src/app/modelo/clases/registro-persona';

import { RegistroServiceService } from 'src/app/service/registro-service.service';
import { EnumEndpoints } from 'src/app/shared/enum-endpoints';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {

  public msgError:any;
  msgRegistroCompletado:string = "";
  
  constructor(private formBuilder:FormBuilder, private registroService:RegistroServiceService, private router:Router){}

  registrarForm = this.formBuilder.group({
    'nombreCompleto': ["", [Validators.required, Validators.minLength(2)]],
    'nombreUsuario': ["", [Validators.required, Validators.minLength(2)]],
    'peso': ["", [Validators.required, Validators.min(20), Validators.max(200)]],
    'actividad': ["Selecciona una opción", Validators.required],
    'email': ["", [Validators.required, Validators.email]],
    'password': ["", [Validators.required, Validators.minLength(5)]]
  });

  get nombreCompleto(){
    return this.registrarForm.get("nombreCompleto") as FormControl;
  }

  get nombreUsuario(){
    return this.registrarForm.get("nombreUsuario") as FormControl;
  }
  get peso(){
    return this.registrarForm.get("peso") as FormControl;
  }
  get actividad(){
    return this.registrarForm.get("actividad") as FormControl;
  }
  get email(){
    return this.registrarForm.get("email") as FormControl;
  }
  get password(){
    return this.registrarForm.get("password") as FormControl;
  }

  isValidField(name:string):boolean{
    const campoNombre = this.registrarForm.get(name) as FormControl;

    return (campoNombre.dirty && !campoNombre.valid);
  }

  crearPersona():RegistroPersona{
    let persona = new RegistroPersona(this.nombreCompleto.value ,this.email.value, this.password.value, this.nombreUsuario.value, this.peso.value, Number(this.actividad.value));

    console.log("Se esta creando la persona:")
    console.log(persona);

    return persona;
  }

  redirectToLogin(){
    this.router.navigate(["/iniciar-sesion"]);
  }

  enviarRegistro(){

    this.msgError = false;

    let body = this.crearPersona();

    this.registroService.postRegistrar(body, EnumEndpoints.registroPath).subscribe(data =>{
      
      this.msgRegistroCompletado = "Registro Realizado!"

      setTimeout(()=>{
        this.router.navigate(["/iniciar-sesion"]);
      }, 1000);

    }, err =>{
      this.msgError = err;
    }
    );
  }

  changeValue(){
    this.msgError = false;
  }
}
