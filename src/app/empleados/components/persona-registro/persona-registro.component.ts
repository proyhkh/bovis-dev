import { Component, OnInit } from '@angular/core';
import { Message, MessageService, PrimeNGConfig } from 'primeng/api';
import { CatPersona, Catalogo, Empleado, Persona } from '../../Models/empleados';
import { EmpleadosService } from '../../services/empleados.service';
import { Router } from '@angular/router';

interface ICatalogo {
  name: string;
  value: string;
}

@Component({
  selector: 'app-persona-registro',
  templateUrl: './persona-registro.component.html',
  styleUrls: ['./persona-registro.component.css'],
})
export class PersonaRegistroComponent implements OnInit {
  isConsulta: boolean = false;
  isConsultaButons: boolean = false;
  listEstadoCivil: Array<Catalogo> = [];
  listTipoSangre: Array<Catalogo> = [];
  listTipoPersona: Array<Catalogo> = [];
  listSexo: Array<Catalogo> = [];
  catEstadoCivil: ICatalogo[] = [];
  catTipoSangre: ICatalogo[] = [];
  catTipoPersona: ICatalogo[] = [];
  catSexo: ICatalogo[] = [];
  fechaNacimiento: Date;
  persona: Persona = new Persona();
  messages1: Message[];
  isCamposRequeridos = false;
  mensajeCamposRequeridos: string = '';

  constructor(
    private empleadosServ: EmpleadosService,
    private config: PrimeNGConfig,
    private messageService: MessageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getConfigCalendar();
    this.getEstadoCivil();
    this.getTipoSangre();
    this.getTipoPersona();
    this.getCatSexo();
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
      if (data.success) {
        this.listEstadoCivil = <Catalogo[]>data['data'];
        this.listEstadoCivil.forEach((element) => {
          this.catEstadoCivil.push({
            name: String(element.descripcion),
            value: String(element.id),
          });
        });
      }
    });
  }

  getTipoSangre() {
    this.listEstadoCivil = [];
    this.empleadosServ.getTipoSangre().subscribe((data) => {
      if (data.success) {
        this.listTipoSangre = <Catalogo[]>data['data'];

        this.listTipoSangre.forEach((element) => {
          this.catTipoSangre.push({
            name: String(element.descripcion),
            value: String(element.id),
          });
        });
      }
    });
  }

  getTipoPersona() {
    this.listEstadoCivil = [];
    this.empleadosServ.getTipoPersona().subscribe((data) => {
      if (data.success) {
        this.listTipoPersona = <Catalogo[]>data['data'];

        this.listTipoPersona.forEach((element) => {
          this.catTipoPersona.push({
            name: String(element.descripcion),
            value: String(element.id),
          });
        });
      }
    });
  }

  getCatSexo() {
    this.listSexo = [];
    this.empleadosServ.getTipoSexo().subscribe((data) => {
      if (data.success) {
        this.listSexo = <Catalogo[]>data['data'];

        this.listSexo.forEach((element) => {
          this.catSexo.push({
            name: String(element.descripcion),
            value: String(element.id),
          });
        });
      }
    });
  }

  onChangeComboEdoCivil(event: any) {
    /* console.log('event :' + event);
    console.log(event.value); */
    if (event.value != null) {
      this.persona.IdEdoCivil = Number.parseInt(String(event.value['value']));
    } else {
      this.persona.IdEdoCivil = 0;
    }
    //console.log(this.persona);
  }

  onChangeComboTipoSangre(event: any) {
    if (event.value != null) {
      this.persona.IdTipoSangre = Number.parseInt(String(event.value['value']));
    } else {
      this.persona.IdTipoSangre = 0;
    }
  }

  onChangeComboSexo(event: any) {
    if (event.value != null) {
      this.persona.Sexo = Number.parseInt(String(event.value['value']));
    } else {
      this.persona.Sexo = 0;
    }
  }

  onChangeComboTipoPersona(event: any) {
    if (event.value != null) {
      this.persona.TipoPersona = Number.parseInt(String(event.value['value']));
    } else {
      this.persona.TipoPersona = 0;
    }
  }

  clearData() {
    this.persona = new Persona();
    this.fechaNacimiento = null;
    this.mensajeCamposRequeridos = '';
    this.isCamposRequeridos = false;
  }

  guardar() {
    /* console.log(this.persona);
    console.log(this.fechaNacimiento);
    console.log(this.fechaNacimiento.toJSON().slice(0, 10).replace(/-/g, '-')); */

    this.camposRequeridos();
    if (this.mensajeCamposRequeridos == '') {
      this.isCamposRequeridos = false;
      this.persona.FechaNacimiento = this.fechaNacimiento.toJSON().slice(0, 10).replace(/-/g, '-');
      this.empleadosServ.savePersona(this.persona).subscribe({
        next: (data) => {
          //console.log(data);
          if (data.success) {

            this.messageService.add({
              severity: "success",
              summary: "Persona",
              detail: "Registro guardado correctamente",
              life: 2000
            });
            setTimeout(
              ()=>{
                this.router.navigate(['/empleados', 'persona']);
            },1500);
          }else{
            console.log(data);
            //this.menssageError(error);
          }
        },
        error: (e) => {
          //console.log(e);
          let error = `${e.message} \n\n ${e.error}`
         this.menssageError(error);
        }
      });

    }
    else{
      this.isCamposRequeridos = true;
      this.messages1 = [
        { severity: 'error', summary: 'Campos requeridos', detail: this.mensajeCamposRequeridos },
      ];
    }
  }

  menssageError(mensaje: string){
    this.messageService.add({
      severity: "error",
      summary: "Error",
      detail: mensaje,
      life: 4000
    });
  }

  camposRequeridos() {
    this.mensajeCamposRequeridos = '';
    this.persona.Nombre == ''
      ? (this.mensajeCamposRequeridos += 'Nombre, ')
      : '';
    this.persona.Sexo == 0
      ? (this.mensajeCamposRequeridos += 'Sexo, ')
      : '';
    this.persona.TipoPersona == 0
      ? (this.mensajeCamposRequeridos += 'Tipo de persona, ')
      : '';
    this.fechaNacimiento == undefined
      ? (this.mensajeCamposRequeridos += 'Fecha de Nacimiento, ')
      : '';
  }

}
