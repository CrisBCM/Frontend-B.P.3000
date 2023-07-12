import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { EnumEndpoints } from '../shared/enum-endpoints';
import jwt_decode from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  usuarioActual:BehaviorSubject<any>;

  constructor(private http:HttpClient) {

    this.usuarioActual = new BehaviorSubject<any>(JSON.parse(localStorage.getItem("usuarioActual") || "{}"));

   }

  iniciarSesion(loginValue:any):Observable<any>{

    return this.http.post(EnumEndpoints.inicioSesionPath, loginValue).pipe(map(data=>{

      localStorage.setItem("usuarioActual", JSON.stringify(data));

      this.usuarioActual.next(data);

      console.log(data);
      
      return data;

    }))
  }

  get usuarioAutenticado(){
    return this.usuarioActual.value;
  }

  get datosPersona(){

    let token = this.usuarioAutenticado.token;
    
    return jwt_decode(token);
  }

}
