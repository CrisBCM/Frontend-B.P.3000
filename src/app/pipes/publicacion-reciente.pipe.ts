import { Pipe, PipeTransform } from '@angular/core';
import { Publicacion } from '../modelo/interfaces/publicacion';

@Pipe({
  name: 'publicacionReciente'
})
export class PublicacionRecientePipe implements PipeTransform {

  transform(publicacionArray: Publicacion[]):Publicacion{

  return publicacionArray.sort((a,b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime())[0];
  }

}
