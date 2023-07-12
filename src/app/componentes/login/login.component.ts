import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginServiceService } from 'src/app/service/login-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  public msgError:any;

  constructor(private formBuilder:FormBuilder, private loginService:LoginServiceService, private router:Router){}

  loginForm = this.formBuilder.group({
    'email': ["",[Validators.required]],
    'password': ["",[Validators.required, Validators.minLength(5)]]
  })

  iniciarSesion(){

    this.loginService.iniciarSesion(this.loginForm.value).subscribe(data=>{

      console.log(data);

      this.router.navigate(['/bp-foro']);
    }, err =>{

      let error = err.error;

      if(typeof error === "string"){
        this.msgError = err.error;
      }
      else{
        this.msgError = "Campos invalidos";
      }

      

      console.log(this.msgError);
      console.log(typeof error)
      console.log(typeof err.error);
    })
  }

  isValidField(name:string):boolean{
    const campoNombre = this.loginForm.get(name) as FormControl;

    return (campoNombre.dirty && !campoNombre.valid);
  }
  
  changeValue(){
    this.msgError = false;
  }

}
