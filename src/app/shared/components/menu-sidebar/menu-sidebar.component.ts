import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MegaMenuItem, MenuItem } from 'primeng/api';

@Component({
  selector: 'app-menu-sidebar',
  templateUrl: './menu-sidebar.component.html',
  styleUrls: ['./menu-sidebar.component.css'],
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

  items: MegaMenuItem[] = [];

  constructor() {}

  ngOnInit(): void {
    this.items = [
      {
        title: 'EMPLEADOS',
        icon: 'icon-empleado',
        items: [
          [
            {
              label: 'EMPLEADOS',
              items: [
                {
                  label: 'Generar requerimiento',
                  routerLink: ['/empleados'],
                  command: () =>
                    this.setModule('empleados'.toUpperCase()),
                },
                {
                  label: 'Ver requerimientos',
                },
                {
                  label: 'Asignar empleado a requerimiento',
                },
                {
                  label: 'Modificar empleados',
                },
              ],
            },
          ],
        ],
      },
      {
        title: 'TIMESHEET',
        icon: 'icon-timesheet',
        items: [
          [
            {
              label: 'TIMESHEET',
              items: [
                {
                  label: 'Cargar Horas',
                },
                {
                  label: 'Consultar / Modificar',
                },
              ],
            },
          ],
        ],
      },
      {
        title: 'COSTO DE EMPLEDADOS',
        icon: 'icon-costos',
        items: [
          [
            {
              label: 'COSTO DE EMPLEDADOS',
              items: [
                {
                  label: 'Costo por empleado',
                },
                {
                  label: 'Costo por proyecto',
                },
              ],
            },
          ],
        ],
      },
      {
        title: 'CIE',
        icon: 'icon-cie',
        items: [
          [
            {
              label: 'CIE',
              items: [
                {
                  label: 'Carga de SAE',
                },
                {
                  label: 'CEI – Resultado búsqueda',
                },
              ],
            },
          ],
        ],
      },
      {
        title: 'PCS',
        icon: 'icon-pcs',
        items: [
          [
            {
              label: 'PCS',
              items: [
                {
                  label: 'IP',
                },
                {
                  label: 'Staffing Plan',
                },
                {
                  label: 'Gastos',
                },
                {
                  label: 'Ingresos',
                },
                {
                  label: 'Control',
                },
                {
                  label: 'PPA-KPI',
                },
              ],
            },
          ],
        ],
      },
      {
        title: 'AUDITORIA LEGAL',
        icon: 'icon-auditoria-legal',
        items: [
          [
            {
              label: 'AUDITORIA LEGAL',
              items: [
                {
                  label: 'Seleccionar documentos del proyecto',
                },
                {
                  label: 'Carga de documentos',
                },
                {
                  label: 'Seguimiento de auditoria',
                },
              ],
            },
          ],
        ],
      },
      {
        title: 'REPORTES',
        icon: 'icon-reportes',
        routerLink: 'reportes',
      },
      {
        title: 'PEC',
        icon: 'icon-pec',
        items: [
          [
            {
              label: 'PEC',
              items: [
                {
                  label: 'Captura',
                  routerLink: ['pec/captura'],
                  command: () =>
                    this.setModule('PLATAFORMA DE EXCELENCIA CORPORATIVA'.toUpperCase()),
                },
                {
                  label: 'Consulta/Evaluación',
                  routerLink: ['pec/evaluacion'],
                  command: () =>
                    this.setModule('PLATAFORMA DE EXCELENCIA CORPORATIVA'.toUpperCase()),
                },
                {
                  label: 'Aceptar objetivos',
                  routerLink: ['pec/objetivos'],
                  command: () =>
                    this.setModule('PLATAFORMA DE EXCELENCIA CORPORATIVA'.toUpperCase()),
                },
              ],
            },
          ],
        ],
      },
      {
        title: 'FACTURACIÓN',
        icon: 'icon-facturacion',
        items: [
          [
            {
              label: 'FACTURACIÓN',
              items: [
                {
                  label: 'Carga CFDI',
                  routerLink: ['facturacion/carga-cfdi'],
                  command: () =>
                    this.setModule('FACTURACIÓN - CARGA CFDI'.toUpperCase()),
                },
                {
                  label: 'NC',
                  routerLink: ['facturacion/nota-credito'],
                  command: () =>
                  this.setModule('FACTURACIÓN - NC'.toUpperCase()),
                },
                {
                  label: 'CRP',
                  routerLink: ['facturacion/crp'],
                  command: () =>
                  this.setModule('FACTURACIÓN - CRP'.toUpperCase()),
                },
                {
                  label: 'Busqueda/Cancelación',
                  routerLink: ['facturacion/cancelacion'],
                  command: () =>
                  this.setModule('FACTURACIÓN - CANCELACIÓN'.toUpperCase()),
                },
              ],
            },
          ],
        ],
      },
      {
        title: 'ADMINISTRACIÓN',
        icon: 'pi pi-fw pi-briefcase',
      },
      {
        title: 'CATALOGOS',
        icon: 'pi pi-fw pi-book',
        items: [
          [
            {
              label: 'CATALOGOS',
              items: [
                {
                  label: 'CATALOGOS',
                  routerLink: ['catalogos'],
                },
              ],
            },
          ],
        ],
      },
    ];
  }


  setModule(name: any) {
    console.log(name);
    this.nameModule.next(name);
  }
}
