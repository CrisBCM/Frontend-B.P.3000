import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { EMPTY, Observable } from 'rxjs';
import { TokenService } from '../service/token.service';
import { Router } from '@angular/router';
import { SharingService } from '../service/sharing.service';
import { SessionExpiredService } from '../service/session-expired.service';

@Injectable()
export class AutenticacionInterceptor implements HttpInterceptor {

  constructor(private tokenService:TokenService, private sharingService:SharingService, private sessionExpSv:SessionExpiredService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    
    this.tokenService.currentToken.subscribe(token =>{

        if(token.token){

          this.tokenService.tokenDecoded$.subscribe(tokenDecoded =>{
            let expiracion = tokenDecoded.exp;
            let fechaActual = Math.floor(Date.now() / 1000);
        
            if(expiracion <= fechaActual){
              this.tokenService.newCurrentToken ="{}";
              this.tokenService.newTokenDecoded = "{}";
              this.sharingService.newPersona = null;
              
              localStorage.removeItem("usuarioActual");
              
              this.sessionExpSv.setSessionExpired = true;

            }

          })

          request = request.clone({
            setHeaders:{
              Authorization: `Bearer ${token.token}`
            }
            
          });
        }
      
      
    });

    
    return next.handle(request);
  }
}
