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

  constructor(private calendar: NgbCalendar, private router: Router, private params: ActivatedRoute) {

    this.params.paramMap.subscribe(responseData => {
      //this.idVoto = responseData.get("id")
      console.log(responseData.get("id"));
      if(responseData.get("id")){
        this.poblarCampos(Number(responseData.get("id")))
      }
    });
  }

  poblarCampos(id: number) {
    let ListEmpleadosModel: Empleado[] = [];
    ListEmpleadosModel = JSON.parse(localStorage.getItem("empleados") || "[]");
    console.log(ListEmpleadosModel);
    this.empleadoModel = <Empleado>ListEmpleadosModel.find(xx => xx.id == id);
  }

  ngOnInit(): void {

  }

  guardar() {

    if (localStorage.getItem("idEmpledoTemp")) {
      localStorage.setItem("idEmpledoTemp", "0");
    }

    let ListEmpleadosModel: Empleado[] = [];
    //console.log(localStorage.getItem("empleados"));
    if (localStorage.getItem("empleados") != null) {
      ListEmpleadosModel = JSON.parse(localStorage.getItem("empleados") || "[]");
      //console.log(ListEmpleadosModel);
    }

    if (this.idEmpleado) {
      this.idEmpleado = 1;
    }
    else {
      let id: string | null = localStorage.getItem("idEmpledoTemp");
      this.idEmpleado = Number(id) + 1;
    }

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
