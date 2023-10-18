import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { LoginServiceService } from 'src/app/service/login-service.service';
import { SpinnerService } from 'src/app/service/spinner.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy{

  public msgError:any;
  spinner:boolean = true;
  onDestroy$:Subject<boolean> = new Subject();

  constructor(private formBuilder:FormBuilder, private loginService:LoginServiceService, private router:Router, private spinnerService:SpinnerService){}

  ngOnInit(): void {
    this.spinnerService.obtenerSpinner.pipe(takeUntil(this.onDestroy$)).subscribe((spinner:boolean)=>{
      this.spinner = spinner;
    })
  }
  ngOnDestroy(): void {
    this.onDestroy$.next(true);
  }

  loginForm = this.formBuilder.group({
    'email': ["",[Validators.required]],
    'password': ["",[Validators.required, Validators.minLength(5)]]
  })

  iniciarSesion(){

    this.loginService.iniciarSesion(this.loginForm.value).subscribe({

      next : () => {
      },
      complete : () =>{
        this.router.navigate(["/bp-foro/general"]);
      },

      error : err =>{

            let error = err.error;
      
            if(typeof error === "string"){
              this.msgError = err.error;
            }
            else{
              this.msgError = "Campos invalidos";
            }
      
          }
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
