import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegistroPersona } from '../modelo/clases/registro-persona';
import { EnumEndpoints } from '../shared/enum-endpoints';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegistroServiceService {

  constructor(private http:HttpClient) {}

  postRegistrar(body:any, path:string):Observable<any>{

    return this.http.post(path, body);
  }
}
