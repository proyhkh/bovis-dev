import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CargaFile, InfoProyectoFacturas } from '../Models/FacturacionModels';


@Injectable({
  providedIn: 'root'
})
export class FacturacionService {

  baseUrl = environment.urlApiBovis;

  private httpHeaders = new HttpHeaders(
    { 'Content-Type': 'application/json' }
  )

  constructor(private http: HttpClient) { }

  cargaXML(procesaFactura: InfoProyectoFacturas): Observable<any> {
    //console.log(procesaFactura);
    return this.http.put(`${this.baseUrl}/api/Factura/agregar`, procesaFactura, { headers: this.httpHeaders });
  }

  getInfoProyecto(numProyecto: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/Factura/infoproyecto/${numProyecto}`,);
  }

}
