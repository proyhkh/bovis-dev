import { Component, OnInit, inject } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';
import { AuditoriaService } from '../../services/auditoria.service';

@Component({
  selector: 'app-auditoria-calidad',
  templateUrl: './auditoria-calidad.component.html',
  styleUrls: ['./auditoria-calidad.component.css']
})
export class AuditoriaCalidadComponent implements OnInit {

  activadedRoute    = inject(ActivatedRoute)
  auditoriaService  = inject(AuditoriaService)

  items: MenuItem[] = [
    { label: 'Seleccionar documentos del proyecto', routerLink: 'seleccionar' },
    { label: 'Carga de documentos', routerLink: 'cargar' },
    { label: 'Seguimiento de auditoria', routerLink: 'seguimiento' },
  ]

  activeItem: MenuItem;

  constructor() { }

  ngOnInit(): void {
    this.activadedRoute.queryParams.subscribe(data => {
      if(data['tipo'] && data['tipo'] === 'legal') {
        this.items = this.items.map(item => ({...item, queryParams: {tipo: data['tipo']}}))
        this.auditoriaService.esLegal = true
        if(!localStorage.getItem('esLegal')) {
          localStorage.setItem('esLegal', '1')
          window.location.reload()
        }
      } else {
        this.items = this.items.map(item => ({...item, queryParams: {tipo: null}}))
        this.auditoriaService.esLegal = false
        if(localStorage.getItem('esLegal')) {
          localStorage.removeItem('esLegal')
          window.location.reload()
        }
      }
    })
  }

  onActiveItemChange(event: any){
    this.activeItem = event
  }

}
