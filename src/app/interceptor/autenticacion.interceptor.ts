import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from '../service/token.service';

@Injectable()
export class AutenticacionInterceptor implements HttpInterceptor {

  constructor(private tokenSevice:TokenService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    let token;
    
    this.tokenSevice.currentToken.subscribe(token =>{
      token = token.token;

        if(token){
          request = request.clone({
            setHeaders:{
              Authorization: `Bearer ${token}`
            }
            
          });
        }
      
      
    });

    
    return next.handle(request);
  }
}
