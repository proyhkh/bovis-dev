import { Injectable } from '@angular/core';
import { errorsArray } from 'src/utils/constants';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  _cargando: boolean = false

  constructor() { }

  get cargando() {
    return this._cargando
  }
  
  cambiarEstado(estado: boolean) {
    Promise.resolve().then(() => this._cargando = estado)
  }

  esInvalido(form: any, campo: string): boolean {
    return form.get(campo).invalid && 
            (form.get(campo).dirty || form.get(campo).touched)
  }

  obtenerMensajeError(form: any, campo: string): string {
    let mensaje = ''

    errorsArray.forEach((error) => {
      if(form.get(campo).hasError(error.tipo))
        mensaje = error.mensaje.toString()
    })

    return mensaje
  }
}
