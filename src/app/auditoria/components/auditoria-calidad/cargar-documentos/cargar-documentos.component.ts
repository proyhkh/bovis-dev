import { Location } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { finalize, forkJoin } from 'rxjs';
import { Seccion } from 'src/app/auditoria/models/auditoria.model';
import { AuditoriaService } from 'src/app/auditoria/services/auditoria.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { TimesheetService } from 'src/app/timesheet/services/timesheet.service';
import { Opcion } from 'src/models/general.model';
import { SUBJECTS, TITLES } from 'src/utils/constants';
import { SubirArchivoComponent } from '../subir-archivo/subir-archivo.component';

interface UploadEvent {
  originalEvent: Event;
  files: File[];
}

@Component({
  selector: 'app-cargar-documentos',
  templateUrl: './cargar-documentos.component.html',
  styleUrls: ['./cargar-documentos.component.css'],
  providers: [MessageService, DialogService]
})
export class CargarDocumentosComponent implements OnInit {

  sharedService     = inject(SharedService)
  messageService    = inject(MessageService)
  activatedRoute    = inject(ActivatedRoute)
  location          = inject(Location)
  fb                = inject(FormBuilder)
  timesheetService  = inject(TimesheetService)
  router            = inject(Router)
  auditoriaService  = inject(AuditoriaService)
  dialogService     = inject(DialogService)

  form = this.fb.group({
    id_proyecto:  ['', Validators.required],
    auditorias:   this.fb.array([]),
  })

  proyectos:  Opcion[] = []
  secciones:  Seccion[] = []
  
  constructor() { }

  ngOnInit(): void {
    this.verificarEstado()

    this.sharedService.cambiarEstado(true)

    forkJoin([
      this.timesheetService.getCatProyectos()
    ])
    .pipe(finalize(() => this.sharedService.cambiarEstado(false)))
    .subscribe({
      next: (value) => {
        const [proyectosR] = value
        this.proyectos = proyectosR.data.map(proyecto => ({code: proyecto.numProyecto.toString(), name: proyecto.nombre}))
      },
      error: (err) => this.messageService.add({severity: 'error', summary: TITLES.error, detail: SUBJECTS.error})
    })
  }

  verificarEstado() {
    this.activatedRoute.queryParams.subscribe(params => {
      // Access query parameters
      const success = params['success']

      if(success) {
        Promise.resolve().then(() => this.messageService.add({ severity: 'success', summary: 'Registro guardado', detail: 'El registro ha sido guardado.' }))
      }

      const urlWithoutQueryParams = this.location.path().split('?')[0];
      this.location.replaceState(urlWithoutQueryParams);
    });
  }

  getSecciones(event: any) {
    this.sharedService.cambiarEstado(true)
    const {value: id} = event

    this.auditoriaService.getProyectoCumplimiento(id)
      .pipe(finalize(() => this.sharedService.cambiarEstado(false)))
      .subscribe({
        next: ({data}) => {
          this.secciones = data
        },
        error: (err) => this.messageService.add({severity: 'error', summary: TITLES.error, detail: SUBJECTS.error})
      })
  }
  
  onSeleccionArchivo(event: UploadEvent, id: number, iParent: number, iChild: number, fileUpload: any) {

    if (event.files.length === 0) return

    const [ archivo ] = event.files;
    const lector = new FileReader();

    lector.onload = () => {
      const documento_base64 = lector.result as string;

      const auditoria = this.secciones.at(iParent).auditorias.at(iChild)
      const body = {
        id_auditoria_proyecto:  auditoria.idAuditoriaCumplimiento,
        motivo:                 'Documento',
        documento_base64
      }

      this.dialogService.open(SubirArchivoComponent, {
        header: 'Subir documento',
        width: '50%',
        contentStyle: {overflow: 'auto'},
        data: {
          archivoBase64: body.documento_base64,
        }
      })
      .onClose.subscribe(({acepta, motivo}) => {
        fileUpload.clear();
        if(acepta) {
          body.motivo = motivo
          this.sharedService.cambiarEstado(true)
          this.auditoriaService.agregarDocumento(body)
            .pipe(finalize(() => this.sharedService.cambiarEstado(false)))
            .subscribe({
              next: (data) => {
                auditoria.tieneDocumento = true
                this.messageService.add({severity: 'success', summary: 'Documento cargado', detail: 'El documento ha sido cargado correctamente'})
              },
              error: (err) => this.messageService.add({severity: 'error', summary: TITLES.error, detail: SUBJECTS.error})
            })
        }
      })
    };

    lector.readAsDataURL(archivo);
  }

}
