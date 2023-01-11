import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Objetivos } from '../Models/subordinados';

@Injectable({
  providedIn: 'root'
})
export class DorService {

  baseUrl = environment.urlApiBovis;
  private httpHeaders = new HttpHeaders(
    { 'Content-Type': 'application/json' }
  )

  constructor(private http: HttpClient) { }

  getDatosEjecutivo(userMail: string | null): Observable<Object>{

    let mail = `{"email":"${userMail}"}`;
    //console.log(mail);
    //console.log(`${this.baseUrl}api/DOR/DatosEjecutivo/${userMail}`);
    return this.http.post<Object>(`${this.baseUrl}api/Dor/DatosEjecutivo`,mail, { headers: this.httpHeaders });
  }

  getDatosSubordinados(name: string): Observable<any> {
    let user = `{"nombre":"${name}"}`;
    //console.log(user);
    return this.http.post(`${this.baseUrl}api/DOR/ListaSubordinados`, user, { headers: this.httpHeaders });
  }

  getObjetivosByProyecto(anio: string, numProyecto: string, concepto: string) {
    return this.http.get<any>(`${this.baseUrl}api/DOR/ConsultarObjetivosProyecto/${anio}/${numProyecto}/${concepto}`);
  }

  updateObjetivos(objetivo: Objetivos): Observable<any> {
    /* let objetivo = `{
      "UnidadDeNegocio":"OPERACIONES",
      "Concepto":"CUALITATIVOS",
      "Descripcion":"Capacitación",
      "Meta":"50000",
      "Real":"algo",
      "Ponderado":"algo",
      "Calificacion":"algo",
      "Nivel2":"algo",
      "Nivel3":"algo",
      "Nivel4":"algo",
      "Nivel5":"algo",
      "Anio":"2022",
      "Proyecto":"101001",
      "Empleado":"10003"
      }`; */
    console.log(objetivo);
    return this.http.put(`${this.baseUrl}api/DOR/AgregarObjetivos`, objetivo, { headers: this.httpHeaders });
  }

  postVoto(objetivos: any): Observable<Object> {
    return this.http.post<Object>(`${this.baseUrl}api/DOR/AgregarObjetivos/`, objetivos, { headers: this.httpHeaders })
  }

  /*  updateVoto(voto: Voto): Observable<Voto>{
     return this.http.put<Voto>(this.urlVoto,voto,{headers: this.httpHeaders})
   } */

}
