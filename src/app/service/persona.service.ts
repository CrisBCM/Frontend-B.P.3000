import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EnumEndpoints } from '../shared/enum-endpoints';
import { Imagen } from '../modelo/clases/imagen';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class PersonaService{

  tokenDecoded$:any;

  constructor(private tokenService:TokenService, private http:HttpClient) {
    
    this.tokenService.tokenDecoded$.subscribe(tokenDecoded =>{
      this.tokenDecoded$ = tokenDecoded;
      console.log("soy tokendecoded$ :" + this.tokenDecoded$)
    })
  }



  getPerfilPersona():Observable<any>{
    console.log("TOKENDECODE GETPERFILPERSONA : " + JSON.stringify(this.tokenDecoded$));
    return this.http.get(`${EnumEndpoints.getPersona}/${this.tokenDecoded$.persona_id}`);
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
