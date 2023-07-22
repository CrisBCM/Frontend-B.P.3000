import { Injectable, OnInit } from '@angular/core';
import { LoginServiceService } from './login-service.service';
import { PerfilPersona } from '../modelo/clases/perfil-persona';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EnumEndpoints } from '../shared/enum-endpoints';
import { Imagen } from '../modelo/clases/imagen';

@Injectable({
  providedIn: 'root'
})
export class PerfilService{

  tokenDecoded:any;
  
  constructor(private loginService: LoginServiceService, private http:HttpClient) {}

  
  getPerfilPersona():Observable<any>{
    this.tokenDecoded = this.loginService.tokenDecoded;
    return this.http.get(`${EnumEndpoints.getPersona}/${this.tokenDecoded.persona_id}`);
  }


  getCaloriasDiarias(pesoKg:number, cantActividad:number):number{

    const numMagico = 22;

    return pesoKg * numMagico * cantActividad;
  }

  getDeficitCalorico(pesoKg:number, cantActividad:number):number{

    let caloriasDiarias = this.getCaloriasDiarias(pesoKg, cantActividad);

    let porcentaje10 = (caloriasDiarias * 10) / 100;

    return Math.round(caloriasDiarias - porcentaje10);
  }

  cambiarAvatar(nombreUsuario:String, imagen:FormData):Observable<Imagen>{
    return this.http.post<Imagen>(`${EnumEndpoints.cambiarAvatar}/${nombreUsuario}`, imagen);
  }
  
}
