import { Component, OnInit } from '@angular/core';
import { CatPersona, Empleado } from '../Models/empleados';
// import { faAlignJustify } from '@fortawesome/free-solid-svg-icons';
import {
  ConfirmationService,
  MessageService,
  PrimeNGConfig,
} from 'primeng/api';
import { EmpleadosService } from '../services/empleados.service';

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css'],
})
export class EmpleadosComponent implements OnInit {
  header = [
    'Nombre',
    'RFC',
    'Fecha de Nacimiento',
    'Email',
    'Telefono',
    'Celular',
    'Curp',
    'Sexo',
    'Tipo Persona',
    'EdoCivil',
    'TipoSangre',
    'Activo',
  ];
  listPersonas: Array<CatPersona> = new Array<CatPersona>();
  // faAlignJustify = faAlignJustify;
  filtroApellido = '';
  requerid = {
    tipoVoto: false,
    numExpediente: false,
    tipoAsunto: false,
  };
  porcentaje = 35;
  size = 10;
  page = 1;
  ListEmpleadosModel: Empleado[] = [];
  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private primengConfig: PrimeNGConfig,
    private empleadosServ: EmpleadosService
  ) {}

  ngOnInit(): void {
    this.primengConfig.ripple = true;

    //console.log(localStorage.getItem("empleados"));
    if (localStorage.getItem('empleados') != null) {
      this.ListEmpleadosModel = JSON.parse(
        localStorage.getItem('empleados') || '[]'
      );
      //console.log(this.ListEmpleadosModel);
    }

    this.getDataPersonas();
  }

  getDataPersonas() {
    this.listPersonas = [];
    this.empleadosServ.getPersonas().subscribe((per) => {
      this.listPersonas = per.data;
    });
  }

  confirm(event: Event, empleado: Empleado) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: '¿Estás seguro de eliminar el registro?',
      icon: 'pi  pi-trash c-del',
      accept: () => {
        setTimeout(() => {
          this.eliminarEmpleado(empleado);
          this.messageService.add({
            severity: 'success',
            summary: 'Empleado',
            detail: 'Registro eliminado correctamente',
          });
        }, 1000);
      },
      reject: () => {
        this.messageService.add({
          severity: 'warn',
          summary: 'Empleado',
          detail: 'Acción cancelada',
        });
      },
    });
  }

  eliminarEmpleado(empleado: Empleado) {
    const index = this.ListEmpleadosModel.findIndex(
      (obj) => obj.id == empleado.id
    );
    console.log(index);
    if (index > -1) {
      this.ListEmpleadosModel.splice(index, 1);
      localStorage.setItem(
        'empleados',
        JSON.stringify(this.ListEmpleadosModel)
      );
    }
    console.log(this.ListEmpleadosModel);
  }
}
