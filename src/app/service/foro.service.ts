import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EnumEndpoints } from '../shared/enum-endpoints';
import { Publicacion } from '../modelo/interfaces/publicacion';

@Injectable({
  providedIn: 'root'
})
export class ForoService {

  constructor(private http:HttpClient) {}

  obtenerPosts():Observable<Publicacion[]>{
    return this.http.get<Publicacion[]>(EnumEndpoints.obtenerPosts);
  }
}
