import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CumplimientoResponse, DocumentoResponse, ProyectoCumplimientoResponse } from '../models/auditoria.model';
import { GenericResponse } from 'src/app/empleados/Models/empleados';

@Injectable({
  providedIn: 'root'
})
export class AuditoriaService {

  baseUrl = environment.urlApiBovis;

  http = inject(HttpClient)

  constructor() { }

  getCumplimiento() {
    return this.http.get<CumplimientoResponse>(`${this.baseUrl}api/Auditoria/Cumplimiento`)
  }

  getProyectoCumplimiento(id: number) {
    return this.http.get<ProyectoCumplimientoResponse>(`${this.baseUrl}api/Auditoria/Cumplimiento/Proyecto/${id}`)
  }

  getDocumento(id: number) {
    return this.http.get<DocumentoResponse>(`${this.baseUrl}api/Auditoria/Cumplimiento/Documento/${id}`)
  }

  agregarCumplimiento(body: any) {
    return this.http.post<GenericResponse>(`${this.baseUrl}api/Auditoria/Cumplimiento/Agregar`, body)
  }

  agregarDocumento(body: any) {
    return this.http.post<GenericResponse>(`${this.baseUrl}api/Auditoria/Cumplimiento/Documento`, body)
  }

  validarDocumentos(body: any) {
    console.log(body)
    return this.http.put<GenericResponse>(`${this.baseUrl}api/Auditoria/Cumplimiento/Documento/Validacion`, body)
  }

}
