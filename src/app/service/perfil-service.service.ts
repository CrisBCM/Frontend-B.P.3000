import { Injectable, OnInit } from '@angular/core';
import { LoginServiceService } from './login-service.service';
import { PerfilPersona } from '../modelo/clases/perfil-persona';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EnumEndpoints } from '../shared/enum-endpoints';

@Injectable({
  providedIn: 'root'
})
export class PerfilServiceService{

  tokenDecoded:any;

  // perfilPersona:PerfilPersona;

  constructor(private loginService: LoginServiceService, private http:HttpClient) {

    this.tokenDecoded = this.loginService.datosPersona;
    console.log("SOY TOKEN DECODED: " + JSON.stringify(this.tokenDecoded));
  }

  
  getPerfilPersona():Observable<any>{
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

  
}
