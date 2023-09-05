import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { PersonaService } from './persona.service';
import { Persona } from '../modelo/interfaces/persona';
import { TokenService } from './token.service';
import { EnumEndpoints } from '../shared/enum-endpoints';
import { Imagen } from '../modelo/interfaces/imagen';
import { Publicacion } from '../modelo/interfaces/publicacion';

@Injectable({
  providedIn: 'root'
})
export class SharingService{

  private persona$: BehaviorSubject<Persona | null> = new BehaviorSubject<Persona | null>(null);
  private totalConsumido$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  private tokenDecoded:any;

  constructor(private http:HttpClient, private personaService:PersonaService, private tokenService:TokenService)
  {
    this.tokenService.tokenDecoded$.subscribe(tokenDecoded$ =>{
      this.tokenDecoded = tokenDecoded$;
    })
  }

  getPerfilPersona():Observable<Persona>{
    return this.http.get<Persona>(`${EnumEndpoints.getPersona}/${this.tokenDecoded.persona_id}`);
  }
  cambiarAvatar(nombreUsuario:String, imagen:FormData):Observable<Imagen>{
    return this.http.post<Imagen>(`${EnumEndpoints.cambiarAvatar}/${nombreUsuario}`, imagen);
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

  set newPersona(persona:Persona | null){
    this.persona$.next(persona);
  }
  set actualizarPublicacionesPersona(publicacion:Publicacion){
    if(this.persona$.value){
      let indexPubli = this.persona$.value.publicaciones.findIndex(publi => publi.id = publicacion.id);
      this.persona$.value.publicaciones[indexPubli] = publicacion;
    }
  }

}

