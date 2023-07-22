import { Pipe, PipeTransform } from '@angular/core';
import { IPublicacion } from '../modelo/interfaces/IPublicacion';

@Pipe({
  name: 'publicacionFiltro'
})
export class PublicacionFiltroPipe implements PipeTransform {

  transform(value: IPublicacion[], query: number):any {
    if(query === 0 || query === undefined) return value;

    let array = value.filter(publicacion => publicacion.id == query);
    console.log(array[0]);
    return array[0];
  }

}
