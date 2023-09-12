import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  spinner:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() { }

  set switchMostrar(estaCargando:boolean){
    this.spinner.next(estaCargando);
  }
  
  get obtenerSpinner(){
    return this.spinner.asObservable();
  }
}
