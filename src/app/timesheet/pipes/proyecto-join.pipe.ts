import { Pipe, PipeTransform } from '@angular/core';
import { Proyecto, Timesheet } from '../models/timesheet.model';

@Pipe({
  name: 'proyectoJoin'
})
export class ProyectoJoinPipe implements PipeTransform {

  transform(ts: Timesheet, ...args: unknown[]): number {

    const [tipo] = args
    let total = 0

    switch(tipo) {
      case 'proyectos':
        ts.proyectos.forEach(proyecto => total += proyecto.tDedicacion)
        break
      case 'proyectosDias':
        ts.proyectos.forEach(proyecto => total += proyecto.dias)
        break
      case 'otros':
        ts.otros.forEach(otro => total += otro.tDedicacion)
        break
      case 'otrosDias':
        ts.otros.forEach(otro => total += otro.dias)
        break
      default:
        total = 0
    }

    return total
    // const arr = proyectos.map(proyecto => `${proyecto.descripcion}: ${proyecto.tDedicacion} %`)
    // return arr.join(" | ");
  }

}
