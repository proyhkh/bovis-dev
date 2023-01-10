import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DorService {

  baseUrl = environment.urlApiBovis;
  private httpHeaders = new HttpHeaders(
    { 'Content-Type': 'application/json' }
  )

  constructor(private http: HttpClient) { }

  getDatosEjecutivo(userMail: string) {
    return this.http.get(`${this.baseUrl}api/dor/GetDatosEjecutivo/${userMail}`);
  }

  getDatosSubordinados(name: string) {
    return this.http.get(`${this.baseUrl}api/dor/GetListaSubordinados/${name}`);
  }

  getObjetivosByProyecto() {
    return this.http.get(`${this.baseUrl}api/dor/ConsultarObjetivosProyecto`);
  }

  postVoto(objetivos: any): Observable<Object>{
    return this.http.post<Object>(`${this.baseUrl}api/dor/AgregarObjetivos/`,objetivos,{headers: this.httpHeaders})
  }

 /*  updateVoto(voto: Voto): Observable<Voto>{
    return this.http.put<Voto>(this.urlVoto,voto,{headers: this.httpHeaders})
  } */

}
