import { Component, OnInit, inject } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AuditoriaService } from '../../services/auditoria.service';
import { Documento } from '../../models/auditoria.model';
import { descargarArchivo } from 'src/helpers/helpers';
import { MessageService } from 'primeng/api';
import { SUBJECTS, TITLES } from 'src/utils/constants';

@Component({
  selector: 'app-ver-documentos',
  templateUrl: './ver-documentos.component.html',
  styleUrls: ['./ver-documentos.component.css'],
  providers: [MessageService]
})
export class VerDocumentosComponent implements OnInit {

  auditoriaService  = inject(AuditoriaService)
  config            = inject(DynamicDialogConfig)
  ref               = inject(DynamicDialogRef)
  messageService    = inject(MessageService)

  documentos: Documento[]

  constructor() { }

  ngOnInit(): void {
    if(this.config.data?.idAuditoria) {
      this.auditoriaService.getDocumentos(this.config.data.idAuditoria)
        .subscribe({
          next: ({data}) => this.documentos = data,
          error: (err) => this.closeDialog()
        })
    } else {
      this.closeDialog()
    }
  }

  descargarDocumento(id: number) {
    if(id != 0) {
      this.auditoriaService.getDocumento(id)
        .subscribe({
          next: ({data}) => {
            this.descargar(data.documentoBase64)
          },
          error: (err) => this.messageService.add({severity: 'error', summary: TITLES.error, detail: SUBJECTS.error})
        })
    }
  }

  async descargar(base64: string) {
    await descargarArchivo(base64, `Documento_${Date.now()}`)
  }

  closeDialog() {
    this.ref.close()
  }

}
