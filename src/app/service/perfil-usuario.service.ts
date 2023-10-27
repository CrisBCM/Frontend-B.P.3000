import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { PersonaDTO } from '../dto/persona-dto';
import { EnumEndpoints } from '../shared/enum-endpoints';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PerfilUsuarioService {
  private perfilUsuario$: BehaviorSubject<PersonaDTO | null> = new BehaviorSubject<PersonaDTO | null>(null);

  private nombreUsuarioActual$:BehaviorSubject<String> = new BehaviorSubject<String>("");

  private switchPublicacionesOComentarios$:BehaviorSubject<Boolean> = new BehaviorSubject<Boolean>(true);

  constructor(private http:HttpClient, private router:Router) {
  }

  obtenerPerfilUsuario(nombreUsuario:string):Observable<PersonaDTO>{
    return this.http.get<PersonaDTO>(`${EnumEndpoints.perfilUsuario}/${nombreUsuario}`);
  }

  redirigirAPerfilUsuario(nombreUsuario:string){
    if(this.nombreUsuarioActual$.value != nombreUsuario){
      this.perfilUsuario$.next(null)
      this.nombreUsuarioActual$.next(nombreUsuario);
    }

    this.router.navigate(["/bp-perfil", nombreUsuario]);
  }
  
  set setPerfilUsuario(perfilUsuario:PersonaDTO | null){
    this.perfilUsuario$.next(perfilUsuario);
   
  }

  get getPerfilUsuario():Observable<PersonaDTO | null>{
    return this.perfilUsuario$.asObservable();
  }

  set setSwitchPublicacionesOComentarios(trueFalse:boolean){
    this.switchPublicacionesOComentarios$.next(trueFalse);
  }
  get getSwitchPublicacionesOComentarios(){
    return this.switchPublicacionesOComentarios$.asObservable();
  }
  set setNombreUsuarioActual(nombreUsuario:string){
    this.nombreUsuarioActual$.next(nombreUsuario);
  }
  get getNombreUsuarioActual(){
    return this.nombreUsuarioActual$.asObservable();
  }
}
