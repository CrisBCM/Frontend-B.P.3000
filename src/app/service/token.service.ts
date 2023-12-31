import { Injectable } from '@angular/core';
import { SharingService } from './sharing.service';
import { BehaviorSubject, Observable } from 'rxjs';
import jwt_decode from "jwt-decode";;

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private currentToken$:BehaviorSubject<any> = new BehaviorSubject<any>(JSON.parse(localStorage.getItem("usuarioActual") || "{}"));
  
  private tokenDecoded:BehaviorSubject<any> = new BehaviorSubject<any>("{}");

  constructor() {
    this.actualizarTokenDecoded();
   
  }


  actualizarTokenDecoded(){
    if(this.currentToken$.value.token){
      this.tokenDecoded.next(jwt_decode(this.currentToken$.value.token));
    }
  }

  get currentToken():Observable<any>{
    return this.currentToken$.asObservable();
  }

  get tokenDecoded$():Observable<any>{
    return this.tokenDecoded.asObservable();
  }
  get tokenDecodedValue(){
    return this.tokenDecoded.value;
  }

  set newCurrentToken(cambio:any){
    this.currentToken$.next(cambio);
  }
  set newTokenDecoded(cambio:any){
    this.tokenDecoded.next(cambio);
  }

}
