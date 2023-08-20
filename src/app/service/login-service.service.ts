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

  constructor(private http:HttpClient, private tokenService:TokenService) {}

  iniciarSesion(loginValue:any):Observable<any>{

    return this.http.post(EnumEndpoints.inicioSesionPath, loginValue).pipe(map((data:any)=>{

      localStorage.setItem("usuarioActual", JSON.stringify(data));

      this.tokenService.newCurrentToken = JSON.parse(localStorage.getItem("usuarioActual") || "{}");

      this.tokenService.actualizarTokenDecoded();
    }))
  }
}
