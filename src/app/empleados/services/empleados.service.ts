import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmpleadosService {

  baseUrl = environment.urlApiBovis;

  constructor(private http: HttpClient) { }

  getEstadoCivil() {
    return this.http.get<any>(`${this.baseUrl}api/catalogo/EstadoCivil/`);
  }

  getTipoSangre() {
    return this.http.get<any>(`${this.baseUrl}api/catalogo/TipoSangre/`);
  }

  getTipoPersona() {
    return this.http.get<any>(`${this.baseUrl}api/catalogo/TipoPersona/`);
  }

}
