import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Persona } from '../modelo/clases/persona';
import { Imagen } from '../modelo/clases/imagen';
import { Comida } from '../modelo/clases/comida';
import { Estomago } from '../modelo/clases/estomago';
import { PerfilService } from './perfil.service';

@Injectable({
  providedIn: 'root'
})
export class SharingService {

  private persona$: BehaviorSubject<Persona | null> = new BehaviorSubject<Persona | null>(null);
  private totalConsumido$: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  constructor(private perfilService:PerfilService) {

    this.cargarPersona();
  
  }

  set cerrarSesion(cerrarSesion:null){
    this.persona$.next(cerrarSesion);
  }

  set totalConsumido(consumoDeldia:number){
    this.totalConsumido$.next(consumoDeldia);
  }

  get obtenerTotalConsumido(){
    return this.totalConsumido$.asObservable();
  }

  get personaBehaviorSubject():Observable<Persona | null>{
    return this.persona$.asObservable();
}

  set cambiarImagenPersona(persona:Persona){
    this.persona$.next(persona);
  }

  cargarPersona():void{
    this.perfilService.getPerfilPersona().subscribe((data:any)=>{

      console.log(data);

      const persona = this.getPersona(data);

      this.persona$.next(persona);

    }),
    (error:any) => {
      console.error('Error al obtener los datos del perfil de la persona.', error);
    }
  }

  

  crearComida(com:any):Comida{
    let imagen = new Imagen(com.imagen.id, com.imagen.nombre, com.imagen.path);
        
    let comida = new Comida(com.id, com.nombreComida, com.calorias, imagen);

    return comida;
  }

  getListaComidas(data:any):Array<Comida>{

    let listaComidas:Array<Comida> = data.estomago.listaComidas;
    let arrayComida:Array<Comida> = [];

      for(let com of listaComidas){

        
        let comida = this.crearComida(com);

        arrayComida.push(comida);
      };

      return arrayComida;
  }

  getEstomago(data:any):Estomago{

    let arrayComida = this.getListaComidas(data);

    let estomago = new Estomago (data.estomago.id, arrayComida, data.estomago.totalConsumido);

    return estomago;
  }

  getPersona(data:any):Persona{
    
    let estomago:Estomago = this.getEstomago(data);

    let persona:Persona = new Persona(data.nombreCompleto, data.nombreUsuario, data.cantidadActividad, estomago, data.pesoCorporal, data.imgAvatar);

    return persona;
  }
}

