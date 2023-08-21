import { Component, OnInit, inject } from '@angular/core';
import { MessageService } from 'primeng/api';
import { finalize, forkJoin } from 'rxjs';
import { AuditoriaService } from 'src/app/auditoria/services/auditoria.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { TITLES, SUBJECTS, errorsArray } from '../../../../../utils/constants';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { Seccion } from 'src/app/auditoria/models/auditoria.model';
import { Opcion } from 'src/models/general.model';
import { TimesheetService } from 'src/app/timesheet/services/timesheet.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seleccionar-documentos',
  templateUrl: './seleccionar-documentos.component.html',
  styleUrls: ['./seleccionar-documentos.component.css'],
  providers: [MessageService]
})
export class SeleccionarDocumentosComponent implements OnInit {

  sharedService     = inject(SharedService)
  messageService    = inject(MessageService)
  auditoriaService  = inject(AuditoriaService)
  fb                = inject(FormBuilder)
  timesheetService  = inject(TimesheetService)
  router            = inject(Router)

  form = this.fb.group({
    id_proyecto:  ['', Validators.required],
    auditorias:   this.fb.array([]),
  })

  esActualizacion:  boolean = false

  proyectos:  Opcion[] = []
  secciones:  Seccion[] = []

  constructor() { }

  get auditorias() {
    return this.form.get('auditorias') as FormArray
  }

  ngOnInit(): void {

    this.sharedService.cambiarEstado(true)

    forkJoin([
      this.auditoriaService.getCumplimiento(),
      this.timesheetService.getCatProyectos()
    ])
    .pipe(finalize(() => this.sharedService.cambiarEstado(false)))
    .subscribe({
      next: (value) => {
        const [auditoriaR, proyectosR] = value
        this.secciones = auditoriaR.data
        this.proyectos = proyectosR.data.map(proyecto => ({code: proyecto.numProyecto.toString(), name: proyecto.nombre}))
        this.secciones.forEach(seccion => {
          seccion.auditorias.forEach(auditoria => {
            this.auditorias.push(this.fb.group({
              id_auditoria: [auditoria.idAuditoriaCumplimiento],
              aplica:       [auditoria.aplica],
              motivo:       [auditoria.motivo],
              punto:        [auditoria.punto],
              cumplimiento: [auditoria.cumplimiento],
              documentoRef: [auditoria.documentoRef],
              id_seccion:   [auditoria.idSeccion],
              seccion:      [seccion.chSeccion]
            }))
          })
        })
      },
      error: (err) => this.messageService.add({severity: 'error', summary: TITLES.error, detail: SUBJECTS.error})
    })
  }

  guardar() {
    this.sharedService.cambiarEstado(true)

    this.auditoriaService.agregarCumplimiento(this.form.value)
      .pipe(finalize(() => this.sharedService.cambiarEstado(false)))
      .subscribe({
        next: (data) => {
          this.router.navigate(['auditoria/auditoria-calidad/cargar'], {queryParams: {success: true}})
        },
        error: (err) => this.messageService.add({severity: 'error', summary: TITLES.error, detail: err.error})
      })
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

  esInvalidoEnArreglo(formArray: FormArray, campo: string, index: number): boolean {
    return formArray.controls[index].get(campo).invalid && 
            (formArray.controls[index].get(campo).dirty || formArray.controls[index].get(campo).touched)
  }

  obtenerMensajeErrorEnArreglo(formArray: FormArray, campo: string, index: number): string {
    let mensaje = ''

    errorsArray.forEach((error) => {
      if(formArray.controls[index].get(campo).hasError(error.tipo))
        mensaje = error.mensaje.toString()
    })

    return mensaje
  }

}
