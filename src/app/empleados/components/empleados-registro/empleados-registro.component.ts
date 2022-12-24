import { Component, OnInit } from '@angular/core';
import { NgbCalendar, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Empleado } from '../../Models/empleados';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-empleados-registro',
  templateUrl: './empleados-registro.component.html',
  styleUrls: ['./empleados-registro.component.css']
})
export class EmpleadosRegistroComponent implements OnInit {

  fechaNacimiento: NgbDateStruct;
  date: { year: number; month: number };
  empleadoModel: Empleado = new Empleado();
  idEmpleado: number;
  disabled = false;
  isEditar = true;

  constructor(private calendar: NgbCalendar, private router: Router, private params: ActivatedRoute) {

    this.params.paramMap.subscribe(responseData => {
      //this.idVoto = responseData.get("id")
      console.log(responseData.get("id"));
      if (responseData.get("id")) {
        this.idEmpleado = Number(responseData.get("id"));
        this.poblarCampos();
        this.isEditar = true;
      }
      else {
        this.isEditar = false;
      }
    });
  }

  poblarCampos() {
    let ListEmpleadosModel: Empleado[] = [];
    ListEmpleadosModel = JSON.parse(localStorage.getItem("empleados") || "[]");
    console.log(ListEmpleadosModel);
    this.empleadoModel = <Empleado>ListEmpleadosModel.find(xx => xx.id == this.idEmpleado);
  }

  ngOnInit(): void {

  }

  guardar() {

    console.log(localStorage.getItem("idEmpledoTemp"));
    if (!localStorage.getItem("idEmpledoTemp")) {
      console.log('ssssss');
      localStorage.setItem("idEmpledoTemp", "0");
    }

    let ListEmpleadosModel: Empleado[] = [];
    if (localStorage.getItem("empleados") != null) {
      ListEmpleadosModel = JSON.parse(localStorage.getItem("empleados") || "[]");
    }

    if (this.isEditar) {
      //Editar
      const index = ListEmpleadosModel.findIndex(obj => obj.id == this.idEmpleado)
      if (index > -1) {
        ListEmpleadosModel.splice(index, 1);
      }
    }
    console.log(ListEmpleadosModel);
    console.log(this.idEmpleado);
    if (this.idEmpleado == undefined || this.idEmpleado) {
      let id: string | null = localStorage.getItem("idEmpledoTemp");
      console.log(id);
      this.idEmpleado = Number(id) + 1;
      localStorage.setItem("idEmpledoTemp", String(this.idEmpleado));
    }

    console.log(this.idEmpleado);
    if (this.fechaNacimiento) {
      this.empleadoModel.fechaNacimiento = this.fechaNacimiento.day + '/' + this.fechaNacimiento.month + '/' + this.fechaNacimiento.year;
    }
    this.empleadoModel.id = this.idEmpleado;

    ListEmpleadosModel.push(this.empleadoModel)
    localStorage.setItem("empleados", JSON.stringify(ListEmpleadosModel))
    console.log(localStorage.getItem("empleados"));


    this.router.navigateByUrl('/empleados',)
  }

  clear() {
    localStorage.clear();

  }

}
