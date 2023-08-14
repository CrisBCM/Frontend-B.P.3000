import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { EnumEndpoints } from '../shared/enum-endpoints';
import jwt_decode from "jwt-decode";
import { SharingService } from './sharing.service';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  constructor(private http:HttpClient, private sharingService:SharingService, private tokenService:TokenService) {}

  iniciarSesion(loginValue:any):Observable<any>{
    console.log("ejecutando iniciar sesion en login SERVICE");

    return this.http.post(EnumEndpoints.inicioSesionPath, loginValue).pipe(map((data:any)=>{
      console.log("guardando usuarioActual en localstorage");

      localStorage.setItem("usuarioActual", JSON.stringify(data));

      console.log("termine de guardar en local storage");

      console.log("seteando el behavior subject en tokenService")
      this.tokenService.newCurrentToken = JSON.parse(localStorage.getItem("usuarioActual") || "{}");
      this.tokenService.actualizarTokenDecoded();
      console.log("termine de setear");
      
      console.log("sharingService cargarpersona()");
      this.sharingService.cargarPersona();

      console.log("termine sharingService cargarpersona()");
    }))
  }
}
