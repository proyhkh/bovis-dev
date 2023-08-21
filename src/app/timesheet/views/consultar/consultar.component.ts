import { AfterViewInit, Component, OnInit, inject } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from 'src/app/shared/services/shared.service';
import { Opcion } from 'src/models/general.model';
import { TimesheetService } from '../../services/timesheet.service';
import { Timesheet } from '../../models/timesheet.model';
import { finalize, forkJoin } from 'rxjs';
import { SUBJECTS, TITLES } from 'src/utils/constants';
import { format } from 'date-fns';

@Component({
  selector: 'app-consultar',
  templateUrl: './consultar.component.html',
  styleUrls: ['./consultar.component.css'],
  providers: [MessageService]
})
export class ConsultarComponent implements AfterViewInit {

  activatedRoute    = inject(ActivatedRoute)
  messageService    = inject(MessageService)
  sharedService     = inject(SharedService)
  timesheetService  = inject(TimesheetService)

  empleados:    Opcion[] = []
  proyectos:    Opcion[] = []
  unidades:     Opcion[] = []
  timesheets:   Timesheet[] = []

  idEmpleado:   number = null
  idProyecto:   number = null
  idUnidad:     number = null
  mes:          number = null

  constructor() { }

  ngAfterViewInit(): void {
    this.verificarEstado()

    this.sharedService.cambiarEstado(true)

    forkJoin([
      this.timesheetService.getEmpleadosByJefeEmail(localStorage.getItem('userMail') || ''),
      this.timesheetService.getCatProyectosByJefeEmail(localStorage.getItem('userMail') || ''),
      this.timesheetService.getCatUnidadNegocio(),
    ])
    .pipe(finalize(() => this.sharedService.cambiarEstado(false)))
    .subscribe({
      next: (value) => {
        const [empleadosR, proyectosR, unidadesR] = value
        this.empleados = empleadosR.data.map(({nunum_empleado_rr_hh, nombre_persona}) => ({name: nombre_persona, code: nunum_empleado_rr_hh.toString()}))
        this.proyectos = proyectosR.data.map(({numProyecto, nombre}) => ({name: nombre, code: numProyecto.toString()}))
        this.unidades = unidadesR.data.map(({id, descripcion}) => ({name: descripcion, code: id.toString()}))
        this.sharedService.cambiarEstado(false)
      },
      error: (err) => this.messageService.add({severity: 'error', summary: TITLES.error, detail: SUBJECTS.error})
    })
  }

  verificarEstado() {

    this.activatedRoute.queryParams.subscribe(params => {
      // Access query parameters
      const success = params['success']

      if(success) {
        Promise.resolve().then(() => this.messageService.add({ severity: 'success', summary: 'Horas guardadas', detail: 'Las horas han sido guardadas.' }))
      }
    });
  }

  buscarRegistros(event: any, tipo: string) {
    this.sharedService.cambiarEstado(true)

    const mesFormateado = this.mes ? +format(this.mes, 'M') : 0
    
    this.timesheetService.getTimeSheetsPorEmpleado(this.idEmpleado || 0, this.idProyecto || 0, this.idUnidad || 0, mesFormateado)
    .pipe(finalize(() => this.sharedService.cambiarEstado(false)))
    .subscribe({
      next: ({data}) => {
        this.timesheets = []
        data.map(ts => this.timesheets.push(ts))
        this.sharedService.cambiarEstado(false)
      },
      error: (err) => this.messageService.add({severity: 'error', summary: TITLES.error, detail: err.error})
    })
  }

}
