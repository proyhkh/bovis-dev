import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Viaticos } from '../Models/viaticos';

@Injectable({
  providedIn: 'root'
})
export class CatalogosService {

  baseUrl = "https://bovis-api-dev.azurewebsites.net/api/catalogo/viatico"

  constructor(private http: HttpClient) { }

  getViaticos() {
    return this.http.get<Viaticos>(`${this.baseUrl}`);
  }
}
