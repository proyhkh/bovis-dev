import { Component, OnInit } from '@angular/core';
import { Empleado } from '../Models/empleados';
import { faAlignJustify } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css']
})
export class EmpleadosComponent implements OnInit {

  header = [
    'Nombre',
    'Datos de contacto',
    'Fecha de Nacimiento',
    'Edad',
    'Sexo',
    'Direccion',
    'Clave ID FED',
    'Email',
    'Telefono',
    'KFC',
    'Curp',
    'NSS',
    'Avance captura'
  ];

  faAlignJustify = faAlignJustify;

  ListEmpleadosModel: Empleado[] = [];
  constructor() { }

  ngOnInit(): void {


    console.log(localStorage.getItem("empleados"));
    if (localStorage.getItem("empleados") != null) {
      this.ListEmpleadosModel = JSON.parse(localStorage.getItem("empleados") || "[]");
      //console.log(this.ListEmpleadosModel);
    }
  }

  editarEmpleado(empleado: any) {
    console.log(empleado);
  }

}
