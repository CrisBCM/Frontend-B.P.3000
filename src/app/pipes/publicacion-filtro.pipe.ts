import { Pipe, PipeTransform } from '@angular/core';
import { Publicacion } from '../modelo/interfaces/publicacion';

@Pipe({
  name: 'publicacionFiltro'
})
export class PublicacionFiltroPipe implements PipeTransform {

  transform(value: Publicacion[], query: number):any {
    if(query === 0 || query === undefined) return value;

    let array = value.filter(publicacion => publicacion.id == query);
    console.log(array[0]);
    return array[0];
  }

}
