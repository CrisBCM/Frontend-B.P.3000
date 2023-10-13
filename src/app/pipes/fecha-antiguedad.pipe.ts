import { Pipe, PipeTransform } from '@angular/core';
import { formatDistance } from 'date-fns';
import { es } from 'date-fns/locale';

@Pipe({
  name: 'fechaAntiguedad'
})
export class FechaAntiguedadPipe implements PipeTransform {

  transform(fecha: Date): string {
    let date = new Date(fecha);
    return formatDistance(date, new Date(), { locale: es });
  }

}
