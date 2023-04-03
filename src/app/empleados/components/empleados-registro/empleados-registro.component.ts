import { Component, OnInit } from '@angular/core';
// import { NgbCalendar, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Catalogo, Empleado } from '../../Models/empleados';
import { ActivatedRoute, Router } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';
import { EmpleadosService } from '../../services/empleados.service';

interface ICatalogo {
  name: string;
  value: string;
}
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
  isConsultaButons: boolean = true;
  listPersonas: Array<Catalogo> = [];
  listTipoEmpleados: Array<Catalogo> = [];
  listCategorias: Array<Catalogo> = [];
  listTipoContratos: Array<Catalogo> = [];
  listEmpresas: Array<Catalogo> = [];
  listCiudades: Array<Catalogo> = [];
  listNivelEstudios: Array<Catalogo> = [];
  listFormasPago: Array<Catalogo> = [];
  listJornadas: Array<Catalogo> = [];
  listDepartamentos: Array<Catalogo> = [];
  listClasificacion: Array<Catalogo> = [];
  listJefesDirecto: Array<Catalogo> = [];
  listUnidadNegocio: Array<Catalogo> = [];

  catPersonas: ICatalogo[] = [];
  catTipoEmpleados: ICatalogo[] = [];
  catCategorias: ICatalogo[] = [];
  catTipoContratos: ICatalogo[] = [];
  catEmpresas: ICatalogo[] = [];
  catCiudades: ICatalogo[] = [];
  catNivelEstudios: ICatalogo[] = [];
  catFormasPago: ICatalogo[] = [];
  catJornadas: ICatalogo[] = [];
  catDepartamentos: ICatalogo[] = [];
  catClasificacion: ICatalogo[] = [];
  catJefesDirecto: ICatalogo[] = [];
  catUnidadNegocio: ICatalogo[] = [];

  fechaIngreso: Date;
  fechaSalida: Date;
  fechaReingreso: Date;

  constructor(private router: Router,
    private params: ActivatedRoute,
    private config: PrimeNGConfig,
    private empleadosServ: EmpleadosService) {

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
    this.getCatPersonas();
    this.getCatTipoEmpleado();
    this.getCatCategorias();
    this.getCatTipoContratos();
    //this.getCatEmpresas(); //falta servicio
    this.getCatCiudades();
    this.getCatNivelEstuidios();
    this.getCatFormasPago();
    this.getCatJornadas();
    this.getCatDepartamentos();
    this.getCatClasificacion();
    //this.getCatJefeDirecto();//falta servicio
    this.getCatUnidadNegocio();

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

  getCatPersonas() {
    this.listPersonas = [];
    this.empleadosServ.getCatPersonas().subscribe((data) => {
      //console.log(data);
      if (data.success) {
        this.listPersonas = <Catalogo[]>data['data'];
        this.listPersonas.forEach((element) => {
          this.catPersonas.push({
            name: String(element.descripcion),
            value: String(element.id),
          });
        });
      }
    });
  }

  getCatTipoEmpleado() {
    this.listTipoEmpleados = [];
    this.empleadosServ.getCatEmpleados().subscribe((data) => {
      if (data.success) {
        this.listTipoEmpleados = <Catalogo[]>data['data'];
        this.listTipoEmpleados.forEach((element) => {
          this.catTipoEmpleados.push({
            name: String(element.descripcion),
            value: String(element.id),
          });
        });
      }
    });
  }

  getCatCategorias() {
    this.listCategorias = [];
    this.empleadosServ.getCatCategorias().subscribe((data) => {
      if (data.success) {
        this.listCategorias = <Catalogo[]>data['data'];
        this.listCategorias.forEach((element) => {
          this.catCategorias.push({
            name: String(element.descripcion),
            value: String(element.id),
          });
        });
      }
    });
  }

  getCatTipoContratos() {
    this.listTipoContratos = [];
    this.empleadosServ.getCatTiposContratos().subscribe((data) => {
      if (data.success) {
        this.listTipoContratos = <Catalogo[]>data['data'];
        this.listTipoContratos.forEach((element) => {
          this.catTipoContratos.push({
            name: String(element.descripcion),
            value: String(element.id),
          });
        });
      }
    });
  }

  getCatEmpresas() {
    this.listEmpresas = [];
    this.empleadosServ.getCatTiposContratos().subscribe((data) => {
      if (data.success) {
        this.listEmpresas = <Catalogo[]>data['data'];
        this.listEmpresas.forEach((element) => {
          this.catEmpresas.push({
            name: String(element.descripcion),
            value: String(element.id),
          });
        });
      }
    });
  }

  getCatCiudades() {
    this.listCiudades = [];
    this.empleadosServ.getCatCiudades().subscribe((data) => {
      if (data.success) {
        this.listCiudades = <Catalogo[]>data['data'];
        this.listCiudades.forEach((element) => {
          this.catCiudades.push({
            name: String(element.descripcion),
            value: String(element.id),
          });
        });
      }
    });
  }

  getCatNivelEstuidios() {
    this.listNivelEstudios = [];
    this.empleadosServ.getCatNivelEstudios().subscribe((data) => {
      if (data.success) {
        this.listNivelEstudios = <Catalogo[]>data['data'];
        this.listNivelEstudios.forEach((element) => {
          this.catNivelEstudios.push({
            name: String(element.descripcion),
            value: String(element.id),
          });
        });
      }
    });
  }

  getCatFormasPago() {
    this.listFormasPago = [];
    this.empleadosServ.getCatFormasPago().subscribe((data) => {
      if (data.success) {
        this.listFormasPago = <Catalogo[]>data['data'];
        this.listFormasPago.forEach((element) => {
          this.catFormasPago.push({
            name: String(element.descripcion),
            value: String(element.id),
          });
        });
      }
    });
  }

  getCatJornadas() {
    this.listJornadas = [];
    this.empleadosServ.getCatJornadas().subscribe((data) => {
      if (data.success) {
        this.listJornadas = <Catalogo[]>data['data'];
        this.listJornadas.forEach((element) => {
          this.catJornadas.push({
            name: String(element.descripcion),
            value: String(element.id),
          });
        });
      }
    });
  }

  getCatDepartamentos() {
    this.listDepartamentos = [];
    this.empleadosServ.getCatDepartamentos().subscribe((data) => {
      if (data.success) {
        this.listDepartamentos = <Catalogo[]>data['data'];
        this.listDepartamentos.forEach((element) => {
          this.catDepartamentos.push({
            name: String(element.descripcion),
            value: String(element.id),
          });
        });
      }
    });
  }

  getCatClasificacion() {
    this.listClasificacion = [];
    this.empleadosServ.getCatClasificacion().subscribe((data) => {
      if (data.success) {
        this.listClasificacion = <Catalogo[]>data['data'];
        this.listClasificacion.forEach((element) => {
          this.catClasificacion.push({
            name: String(element.descripcion),
            value: String(element.id),
          });
        });
      }
    });
  }

  getCatJefeDirecto() {
    this.listJefesDirecto = [];
    this.empleadosServ.getCatClasificacion().subscribe((data) => {
      if (data.success) {
        this.listJefesDirecto = <Catalogo[]>data['data'];
        this.listJefesDirecto.forEach((element) => {
          this.catJefesDirecto.push({
            name: String(element.descripcion),
            value: String(element.id),
          });
        });
      }
    });
  }

  getCatUnidadNegocio() {
    this.listUnidadNegocio = [];
    this.empleadosServ.getCatUnidadNegocio().subscribe((data) => {
      if (data.success) {
        this.listUnidadNegocio = <Catalogo[]>data['data'];
        this.listUnidadNegocio.forEach((element) => {
          this.catUnidadNegocio.push({
            name: String(element.descripcion),
            value: String(element.id),
          });
        });
      }
    });
  }

}
