import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { Catalogo, Empleado } from '../../Models/empleados';
import { EmpleadosService } from '../../services/empleados.service';

interface ICatalogo {
  name: string,
  value: string
}

@Component({
  selector: 'app-persona-registro',
  templateUrl: './persona-registro.component.html',
  styleUrls: ['./persona-registro.component.css'],
})
export class PersonaRegistroComponent implements OnInit {
  empleadoModel: Empleado = new Empleado();
  isConsulta: boolean = false;
  isConsultaButons: boolean = true;
  listEstadoCivil: Array<Catalogo> = [];
  listTipoSangre: Array<Catalogo> = [];
  listTipoPersona: Array<Catalogo> = [];
  catEstadoCivil: ICatalogo[] = [];
  catTipoSangre: ICatalogo[] = [];
  catTipoPersona: ICatalogo[] = [];

  constructor(
    private empleadosServ: EmpleadosService,
    private config: PrimeNGConfig
  ) {}

  ngOnInit(): void {
    this.getConfigCalendar();
    this.getEstadoCivil();
    this.getTipoSangre();
    this.getTipoPersona();
  }

  getConfigCalendar() {
    this.config.setTranslation({
      firstDayOfWeek: 1,
      dayNames: [
        'domingo',
        'lunes',
        'martes',
        'miércoles',
        'jueves',
        'viernes',
        'sábado',
      ],
      dayNamesShort: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'],
      dayNamesMin: ['D', 'L', 'M', 'X', 'J', 'V', 'S'],
      monthNames: [
        'Enero',
        'Febrero',
        'Marzo',
        'Abril',
        'Mayo',
        'Junio',
        'Julio',
        'Agosto',
        'Septiembre',
        'Octubre',
        'Noviembre',
        'Diciembre',
      ],
      monthNamesShort: [
        'ene',
        'feb',
        'mar',
        'abr',
        'may',
        'jun',
        'jul',
        'ago',
        'sep',
        'oct',
        'nov',
        'dic',
      ],
      today: 'Hoy',
      clear: 'Limpiar',
    });
  }

  getEstadoCivil() {
    this.listEstadoCivil = [];
    this.empleadosServ.getEstadoCivil().subscribe((data) => {
      //console.log(data);
      if(data.success){
        this.listEstadoCivil = <Catalogo[]>data['data'];
        this.listEstadoCivil.forEach(element => {
          this.catEstadoCivil.push({ name: String(element.descripcion), value: String(element.id) })
        });
      }
    });
  }

  getTipoSangre() {
    this.listEstadoCivil = [];
    this.empleadosServ.getTipoSangre().subscribe((data) => {
      if(data.success){
        this.listTipoSangre = <Catalogo[]>data['data'];

        this.listTipoSangre.forEach(element => {
          this.catTipoSangre.push({ name: String(element.descripcion), value: String(element.id) })
        });
      }
    });
  }

  getTipoPersona() {
    this.listEstadoCivil = [];
    this.empleadosServ.getTipoPersona().subscribe((data) => {
      if(data.success){
        this.listTipoPersona = <Catalogo[]>data['data'];

        this.listTipoPersona.forEach(element => {
          this.catTipoPersona.push({ name: String(element.descripcion), value: String(element.id) })
        });
      }
    });
  }

}
