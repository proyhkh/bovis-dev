import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-menu-sidebar',
  templateUrl: './menu-sidebar.component.html',
  styleUrls: ['./menu-sidebar.component.css']
})
export class MenuSidebarComponent implements OnInit {
  @Output() nameModule = new EventEmitter<string>();

  rol: string;
  _accesos: any = [];
  get accesos(): any {
    return this._accesos;
  }
  @Input() set accesos(value: any) {
    //console.log(value);
    if (value) {
      this._accesos = value;
      this.rol = value[0].split('.')[0];
      console.log(this.rol);
    }
  }

  items: MenuItem[] = [];

  constructor() {
   }

  ngOnInit(): void {
    this.items = [
      {
         label:'Empleados',
         icon:'pi pi-fw pi-users',
         routerLink : 'empleados'
      },
      {
         label:'Timesheet',
         icon:'pi pi-fw pi-clock'
      },
      {
         label:'Costo de Empleados',
         icon:'pi pi-fw pi-dollar'
      },
      {
         label:'CIE',
         icon:'pi pi-fw pi-comments'
      },
      {
         label:'PCS',
         icon:'pi pi-fw pi-comments'
      },
      {
        label:'Auditoria Legal',
        icon:'pi pi-fw pi-briefcase'
      },
      {
        label:'Reportes',
        icon:'pi pi-fw pi-file'
      },
      {
        label:'DOR',
        icon:'pi pi-fw pi-verified',
        items:[
          {
            label:'Captura',
            icon:'pi pi-fw pi-plus',
          },
          {
            label:'Consulta/Evaluación',
            icon:'pi pi-fw pi-search'
          },
          {
            label:'Aceptar Objetivos',
            icon:'pi pi-fw pi-thumbs-up'
          }
        ]
      },
      {
        label:'Facturación',
        icon:'pi pi-fw pi-file',
        items:[
          {
            label:'Carga archivo',
            icon:'pi pi-fw pi-plus',
          }
        ]
      },
      {
        label:'Catalogos',
        icon:'pi pi-fw pi-book'
      },
      {
        label:'Usuarios',
        icon:'pi pi-fw pi-users',
        items:[
          {
            label:'Opción 1',
            icon:'pi pi-fw pi-plus',
          }
        ]
      },
      {
        label:'Carga de Información',
        icon:'pi pi-fw pi-cloud-upload',
        items:[
          {
            label:'Opción 1',
            icon:'pi pi-fw pi-plus',
          }
        ]
      },
    ];
  }

  setModule(name: any){
    this.nameModule.next(name);
  }

}
