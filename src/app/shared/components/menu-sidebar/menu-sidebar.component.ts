import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MegaMenuItem, MenuItem } from 'primeng/api';

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

  items: MegaMenuItem[] = [];

  constructor() {
   }

  ngOnInit(): void {
    this.items = [
      {
        title: 'Empleados',
        icon:'icon-empleado',
        items: [
        [
          {
            label: 'Empleados',
            items: [
              { 
                label: "Generar requerimiento",
                routerLink:['/empleados']
              },
              { 
                label: "Ver requerimientos"
              },
              { 
                label: "Asignar empleado a requerimiento"
              },
              { 
                label: "Modificar empleados"
              }
            ]
          }
        ]
        ]
      },
      {
        title:'Timesheet',
        icon:'icon-timesheet',
        items: [
          [
            {
              label:'Timesheet',
              items:[
                { 
                  label: "Cargar Horas" 
                },
	              { 
                  label: "Consultar / Modificar" 
                }
              ]
            }
          ]
        ]
      },
      {
          title:'Costo de Empleados',
          icon:'icon-costos',
          items:[
            [
              {
                label:'Costo de Empleados',
                items: [
                  { 
                    label:"Costo por empleado"
                  },
	                { 
                    label:"Costo por proyecto"
                  }
                ]
              }
            ]
          ]
      },
      {
        title:'CIE',
        icon:'icon-cie',
        items: [
          [
            {
              label:'CIE',
              items: [
                { 
                  label:"Carga de SAE" 
                },
	              { 
                  label:"CEI – Resultado búsqueda" 
                }
              ]
            }
          ]
        ]
      },
      {
        title:'PCS',
        icon:'icon-pcs',
        items:[
          [
            { 
              label:'PCS',
              items:[
                { 
                  label: "IP"
                },
                { 
                  label: "Staffing Plan"
                },
                { 
                  label: "Gastos"
                },
                { 
                  label: "Ingresos"
                },
                { 
                  label: "Control"
                },
                { 
                  label: "PPA-KPI"
                }
              ]
            }
          ]
        ]
      },
      {
        title:'Auditoria Legal',
        icon:'icon-auditoria-legal',
        items:[
          [
            {
              label:'Auditoria Legal',
              items: [
                { 
                  label:"Seleccionar documentos del proyecto"
                },
	              { 
                  label:"Carga de documentos"
                },
	              { 
                  label:"Seguimiento de auditoria"
                }
              ]
            }
          ]
        ]
      },
      {
        title:'Reportes',
        icon:'icon-reportes',
        routerLink:'reportes'
      },
      {
        title:'PEC',
        icon:'icon-pec',
        items:[[
          {
            label:'PEC',
            items:[
              { 
                label:"Captura"
              },
	            { 
                label:"Consulta/Evaluación"
              },
	            { 
                label:"Aceptar objetivos"
              }
            ]
          }
        ]]
      },
      {
        title:'Facturación',
        icon:'icon-facturacion',
        items:[[
          {
            label:'Facturación',
            items:[
              { 
                label:"Carga CFDI"
              },
	            { 
                label:"NC"
              },
	            { 
                label:"CRP"
              },
	            { 
                label:"Busqueda/Cancelación"
              }
            ]
          }
        ]]
      },
      {
        title:'Administración',
        icon:'pi pi-fw pi-briefcase'
      },
      {
        title:'Catalogos',
        icon:'pi pi-fw pi-book',
        items:[
          [
            {
              label:'Catalogos',
              items:[
              ]
            }
          ]
        ]
      },
    ];
  }

  setModule(name: any){
    this.nameModule.next(name);
  }

}
