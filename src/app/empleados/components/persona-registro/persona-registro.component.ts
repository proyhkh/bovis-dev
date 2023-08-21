import { Component, OnInit } from '@angular/core';
import { Message, MessageService, PrimeNGConfig } from 'primeng/api';
import { CatPersona, Catalogo, Empleado, Persona } from '../../Models/empleados';
import { EmpleadosService } from '../../services/empleados.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from 'src/app/shared/services/shared.service';
import { finalize, forkJoin } from 'rxjs';
import { CALENDAR, SUBJECTS, TITLES, errorsArray } from 'src/utils/constants';
import { FormBuilder, Validators } from '@angular/forms';
import { format } from 'date-fns';

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
  esActualizacion = false

  form = this.fb.group({
    id_persona:       [null],
    nombre:           ['', Validators.required],
    apellido_paterno: ['', Validators.required],
    apellido_materno: [''],
    id_edo_civil:     ['', Validators.required],
    fecha_nacimiento: [null, Validators.required],
    id_tipo_sangre:   ['', Validators.required],
    id_sexo:          ['', Validators.required],
    rfc:              ['', Validators.required],
    id_tipo_persona:  ['', Validators.required],
    email:            ['', [Validators.required, Validators.email]],
    telefono:         ['', Validators.required],
    celular:          ['', Validators.required],
    curp:             ['', [Validators.required, Validators.minLength(18)]]
  })

  constructor(
    private empleadosServ: EmpleadosService,
    private config: PrimeNGConfig,
    private messageService: MessageService,
    private router: Router,
    private sharedService: SharedService,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.sharedService.cambiarEstado(true)
    this.getConfigCalendar()
    forkJoin([
      this.empleadosServ.getEstadoCivil(),
      this.empleadosServ.getTipoSangre(),
      this.empleadosServ.getTipoPersona(),
      this.empleadosServ.getTipoSexo()
    ])
    .pipe(finalize(() => {
      this.verificarActualizacion()
    }))
    .subscribe({
      next: ([edoCivilR, tipoSangreR, tipoPersonaR, tipoSexoR]) => {
      this.setEstadoCivil(edoCivilR.data)
      this.setTipoSangre(tipoSangreR.data)
      this.setTipoPersona(tipoPersonaR.data)
      this.setCatSexo(tipoSexoR.data)
      },
      error: (err) => this.messageService.add({ severity: 'error', summary: TITLES.error, detail: SUBJECTS.error })
    })
  }

  verificarActualizacion() {
    this.activatedRoute.params
      .subscribe(({id}) => {
        if(id) {
          this.esActualizacion = true
          this.empleadosServ.getPersona(id)
            .pipe(finalize(() => this.sharedService.cambiarEstado(false)))
            .subscribe({
              next: ({data}) => {
                // console.log(data)
                this.form.patchValue({
                  id_persona:       data.nukidpersona,
                  nombre:           data.chnombre,
                  apellido_paterno: data.chap_paterno,
                  apellido_materno: data.chap_materno,
                  id_edo_civil:     data.nukidedo_civil.toString(),
                  fecha_nacimiento: new Date(data.dtfecha_nacimiento) as any,
                  id_tipo_sangre:   data.nukidtipo_sangre.toString(),
                  id_sexo:          data.nukidsexo.toString(),
                  rfc:              data.chrfc,
                  id_tipo_persona:  data.nukidtipo_persona.toString(),
                  email:            data.chemail,
                  telefono:         data.chtelefono,
                  celular:          data.chcelular,
                  curp:             data.chcurp
                })
              },
              error: (err) => this.messageService.add({ severity: 'error', summary: TITLES.error, detail: SUBJECTS.error })
            })
        } else {
          this.sharedService.cambiarEstado(false)
        }
    })
  }

  getConfigCalendar() {
    this.config.setTranslation({
      firstDayOfWeek: 1,
      dayNames: CALENDAR.dayNames ,
      dayNamesShort: CALENDAR.dayNamesShort,
      dayNamesMin: CALENDAR.dayNamesMin,
      monthNames: CALENDAR.monthNames,
      monthNamesShort: CALENDAR.monthNamesShort,
      today: 'Hoy',
      clear: 'Limpiar',
    });
  }

  setEstadoCivil(data: any[]) {
    data.forEach((element) => this.catEstadoCivil.push({
        name: String(element.descripcion),
        value: String(element.id),
      })
    )
  }

  setTipoSangre(data: any[]) {
    data.forEach((element) => this.catTipoSangre.push({
        name: String(element.descripcion),
        value: String(element.id),
      })
    )
  }

  setTipoPersona(data: any[]) {
    data.forEach((element) => this.catTipoPersona.push({
        name: String(element.descripcion),
        value: String(element.id),
      })
    )
  }

  setCatSexo(data: any[]) {
    data.forEach((element) => this.catSexo.push({
        name: String(element.descripcion),
        value: String(element.id),
      })
    )
  }

  guardar() {
    if(!this.form.valid) {
      this.form.markAllAsTouched()
      return
    }

    this.sharedService.cambiarEstado(true)

    this.empleadosServ.guardarPersona(this.form.value, this.esActualizacion)
      .pipe(finalize(() => this.sharedService.cambiarEstado(false)))
      .subscribe({
        next: (data) => {
          // console.log(data)
          this.form.reset()
          this.router.navigate(['/empleados/persona'], {queryParams: {success: true}});
        },
        error: (err) => {
          this.messageService.add({ severity: 'error', summary: TITLES.error, detail: SUBJECTS.error })
        }
      })
  }

  limpiar() {
    this.form.reset()
  }

  esInvalido(campo: string): boolean {
    return this.form.get(campo).invalid && 
            (this.form.get(campo).dirty || this.form.get(campo).touched)
  }

  obtenerMensajeError(campo: string): string {
    let mensaje = ''

    errorsArray.forEach((error) => {
      if(this.form.get(campo).hasError(error.tipo))
        mensaje = error.mensaje.toString()
    })

    return mensaje
  }

}
