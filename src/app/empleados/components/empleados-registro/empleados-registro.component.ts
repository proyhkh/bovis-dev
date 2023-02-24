import { Component, OnInit } from '@angular/core';
// import { NgbCalendar, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Empleado } from '../../Models/empleados';
import { ActivatedRoute, Router } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';
@Component({
  selector: 'app-empleados-registro',
  templateUrl: './empleados-registro.component.html',
  styleUrls: ['./empleados-registro.component.css']
})
export class EmpleadosRegistroComponent implements OnInit {

  empleadoModel: Empleado = new Empleado();
  idEmpleado: number;
  disabled = false;
  isEditar = true;
  isConsulta: boolean = true;

  constructor(private router: Router, private params: ActivatedRoute, private config: PrimeNGConfig) {

    this.params.paramMap.subscribe(responseData => {
      this.params.snapshot.routeConfig?.path && this.params.snapshot.routeConfig?.path.includes('consulta') ? this.isConsulta = true : this.isConsulta = false;
      //this.idVoto = responseData.get("id")
      //console.log(responseData.get("id"));
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
    //console.log(ListEmpleadosModel);
    this.empleadoModel = <Empleado>ListEmpleadosModel.find(xx => xx.id == this.idEmpleado);
    this.empleadoModel.fechaNacimiento = new Date (this.empleadoModel.fechaNacimiento);
    //console.log(this.empleadoModel);
  }

  ngOnInit(): void {
    this.getConfigCalendar();
  }

  getConfigCalendar() {
    this.config.setTranslation(
      {
        firstDayOfWeek: 1,
        dayNames: ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'],
        dayNamesShort: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'],
        dayNamesMin: ['D', 'L', 'M', 'X', 'J', 'V', 'S'],
        monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        monthNamesShort: ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'],
        today: 'Hoy',
        clear: 'Limpiar',
      }
    );

    /*  this.es = {
       closeText: "Cerrar",
       prevText: "<Ant",
       nextText: "Sig>",
       currentText: "Hoy",
       monthNames: ["enero", "febrero", "marzo", "abril", "mayo", "junio",
         "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"],
       monthNamesShort: ["ene", "feb", "mar", "abr", "may", "jun",
         "jul", "ago", "sep", "oct", "nov", "dic"],
       dayNames: ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"],
       dayNamesShort: ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"],
       dayNamesMin: ["D", "L", "M", "X", "J", "V", "S"],
       weekHeader: "Sm",
       dateFormat: "dd/mm/yy",
       firstDay: 1,
       isRTL: false,
       showMonthAfterYear: false,
       yearSuffix: ""
     };
 */
  }

  guardar() {

    //console.log(localStorage.getItem("idEmpledoTemp"));
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
    //console.log(ListEmpleadosModel);
    //console.log(this.idEmpleado);
    if (this.idEmpleado == undefined || this.idEmpleado) {
      let id: string | null = localStorage.getItem("idEmpledoTemp");
      console.log(id);
      this.idEmpleado = Number(id) + 1;
      localStorage.setItem("idEmpledoTemp", String(this.idEmpleado));
    }

    // console.log(this.idEmpleado);
    /* if (this.fechaNacimiento) {
      this.empleadoModel.fechaNacimiento = this.fechaNacimiento.day + '/' + this.fechaNacimiento.month + '/' + this.fechaNacimiento.year;
    } */
    this.empleadoModel.id = this.idEmpleado;

    console.log(this.empleadoModel);
    ListEmpleadosModel.push(this.empleadoModel)
    localStorage.setItem("empleados", JSON.stringify(ListEmpleadosModel))
    //console.log(localStorage.getItem("empleados"));


    this.router.navigateByUrl('/empleados',)
  }

  clear() {
    //localStorage.clear();
    localStorage.removeItem("empleados");
  }

}
