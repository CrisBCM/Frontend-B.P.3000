import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EnumEndpoints } from '../shared/enum-endpoints';

@Injectable({
  providedIn: 'root'
})
export class ComidaService {

  constructor(private http:HttpClient) { }
  

  subirComida(formData:FormData, id:number, nombreUsuario:string, options:any):Observable<any>{
    return this.http.put(`${EnumEndpoints.añadirComida}/${id}/${nombreUsuario}`, formData, options);
  }
  eliminarComida(idEstomago:number, idComida:number):Observable<string>{
    return this.http.delete(`${EnumEndpoints.eliminarComida}/${idEstomago}/${idComida}`, {responseType: 'text'});
  }
  editarComida(idEstomago:number, formData:FormData, nombreUsuario:string, idComida:number):Observable<any>{
    return this.http.put(`${EnumEndpoints.editarComida}/${idEstomago}/${idComida}/${nombreUsuario}`, formData);
  }

}
