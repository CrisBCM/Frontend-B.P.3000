import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Publicacion } from '../modelo/interfaces/publicacion';

@Injectable({
  providedIn: 'root'
})
export class PublicacionService {

  private publicacion$:BehaviorSubject<Publicacion | null> = new BehaviorSubject<Publicacion | null>(null);

  constructor() {}

  set setPublicacion(publicacion:Publicacion){
    this.publicacion$.next(publicacion);
  }
  
  get getPublicacion(){
    return this.publicacion$.asObservable();
  }
}
