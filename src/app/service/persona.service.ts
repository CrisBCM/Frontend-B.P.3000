import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PersonaService{

  constructor() {}


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
