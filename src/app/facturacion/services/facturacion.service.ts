import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CargaFile } from '../Models/FacturacionModels';


@Injectable({
  providedIn: 'root'
})
export class FacturacionService {

  baseUrl = environment.urlApiBovis;

  private httpHeaders = new HttpHeaders(
    { 'Content-Type': 'application/json' }
  )

  constructor(private http: HttpClient) { }

  cargaXML(archivo: CargaFile): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/Factura/Enviar`, archivo, { headers: this.httpHeaders });
  }

}
