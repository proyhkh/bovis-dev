import { Component, OnInit } from '@angular/core';
import { EmpleadosService } from '../../services/empleados.service';
import { CatEmpleado } from '../../Models/empleados';

@Component({
  selector: 'app-empleados-principal',
  templateUrl: './empleados-principal.component.html',
  styleUrls: ['./empleados-principal.component.css']
})
export class EmpleadosPrincipalComponent implements OnInit {

  header = [
    'Número de empleado RRHH',
    'Persona',
    'Tipo empleado',
    'Categoria',
    'Tipo de contrato',
    'Puesto',
    'Empresa',
    'Ciudad',
    'Nivel de estudios',
    'Forma de pago',
    'Jornada',
    'Departamento',
    'Clasificación',
    'Número de directo',
    'Número de negocio',
    'Número de sat',
    'Número de empleado',
    'Fecha de ingreso',
    'Fecha de salida',
    'Fecha de reingreso',
    'Nss',
    'Email Bovis',
    'Experiencias',
    'Habilidades',
    'Repositorio',
    'Salario',
    'Profesión',
    'Antiguedad',
    'Turno',
    'Unidad medica',
    'Registro patronal',
    'Cotización',
    'Duración',
    'Activo',
    'Descuento de pension',
    'Pension',
    'Fondo fijo',
    'Número de infonavit',
    'Tipo descuento',
    'Descuento',
    'Número de noi'
  ];

  listEmpleados: Array<CatEmpleado> = new Array<CatEmpleado>();

  constructor( private empleadosServ: EmpleadosService) { }

  ngOnInit(): void {
    this.getDataEmpleados();
  }

  getDataEmpleados() {
    this.listEmpleados = [];
    this.empleadosServ.getEmpleados().subscribe((emp) => {
      this.listEmpleados = emp.data;
    });
  }

}
