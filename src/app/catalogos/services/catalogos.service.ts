import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Viaticos } from '../Models/viaticos';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CatalogosService {


  baseUrl = environment.urlApiBovis;

  constructor(private http: HttpClient) { }

  getViaticos() {
    return this.http.get<Viaticos>(`${this.baseUrl}api/catalogo/viatico`);
  }
}
