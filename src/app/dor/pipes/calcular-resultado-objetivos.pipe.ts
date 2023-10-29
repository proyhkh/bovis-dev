import { Pipe, PipeTransform } from '@angular/core';
import { Objetivos } from '../Models/subordinados';

@Pipe({
  name: 'calcularResultadoObjetivos'
})
export class CalcularResultadoObjetivosPipe implements PipeTransform {

  transform(objetivo: Objetivos, ...args: unknown[]): unknown {

    let resultado = 0
    
    // (+objetivo.porcentajeReal < +objetivo.valor ? 0 : objetivo.porcentajeReal)

    // if(+objetivo.porcentajeReal < +objetivo.valor) {
    //   resultado = 0
    // }

    if(+objetivo.porcentajeReal >= +objetivo.valor) {
      resultado = +objetivo.valor
    }

    return Math.round(resultado).toFixed(2);
  }

}
