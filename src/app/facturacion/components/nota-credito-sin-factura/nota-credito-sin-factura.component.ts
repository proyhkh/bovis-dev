import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { FacturacionService } from '../../services/facturacion.service';
import { MessageService } from 'primeng/api';
import { FacrurasNC, InfoProyecto, LstFacturas, ResponseXML } from '../../Models/FacturacionModels';
import { Opcion } from 'src/models/general.model';
import { TimesheetService } from 'src/app/timesheet/services/timesheet.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { finalize } from 'rxjs';
import { TITLES } from 'src/utils/constants';

@Component({
  selector: 'app-nota-credito-sin-factura',
  templateUrl: './nota-credito-sin-factura.component.html',
  styleUrls: ['./nota-credito-sin-factura.component.css']
})
export class NotaCreditoSinFacturaComponent implements OnInit {

  cargaFileServ     = inject(FacturacionService)
  messageService    = inject(MessageService)
  timesheetService  = inject(TimesheetService)
  sharedService     = inject(SharedService)

  isLoadingFacturas: boolean = false;
  fileSizeMax = 1000000;
  isClear: boolean = false;
  strFileBase64: string = '';
  listFacturasBase64: Array<LstFacturas> = new Array<LstFacturas>();
  infoProyecto: InfoProyecto = new InfoProyecto();
  @ViewChild('fileUpload') fileUpload: any;
  listResponse: Array<ResponseXML>;
  errorMEssageFile: string = '';
  proyectos: Opcion[] = []
  idProyecto: number
  facturaBase64: string
  
  constructor() { }

  ngOnInit(): void {

    this.sharedService.cambiarEstado(true)
    this.timesheetService.getCatProyectos()
      .pipe(finalize(() => this.sharedService.cambiarEstado(false)))
      .subscribe({
        next: ({data}) => this.proyectos = data.map(proyecto => ({code: proyecto.numProyecto.toString(), name: proyecto.nombre})),
        error: (err) => this.messageService.add({severity: 'error', summary: TITLES.error, detail: err.error})
      })
  }

  async onBasicUpload(event: any) {
    if (event && event.files) {
      //console.log('length: ' + event.files.length);
      this.isLoadingFacturas = true;
      await this.convertXML(event.files)
      //console.log(this.listFacturasBase64);

      setTimeout(
        ()=>{
        this.cargaFile()
      },3000);
    }
  }

  async convertXML(files: any) {
    return new Promise((resolve, reject) => {
      let listFacturasBase64Sub: Array<LstFacturas> = new Array<LstFacturas>();
      for (let file of files) {
        let reader = new FileReader();
        reader.onload = (evt) => {
          const xmlData: string = (evt as any).target.result;
          var parser = new DOMParser();
          var xmlz = parser.parseFromString(xmlData, "application/xml");
          this.strFileBase64 = window.btoa((new XMLSerializer()).serializeToString(xmlz));
          resolve(listFacturasBase64Sub);
        };
        reader.onerror = reject;
        reader.readAsText(file);
      }

    });
  }

  cargaFile() {

    this.listResponse = new Array<ResponseXML>();
    try {
      const body = {
        NumProyecto: this.idProyecto,
        FacturaB64: this.strFileBase64
      }
      this.cargaFileServ.cargarNotaSinFactura(body).subscribe({
        next: (data) => {
          //console.log(data);
          if (data.success) {
            this.listResponse = data.data;
            //console.log(this.listResponse);
            this.messageService.add({
              severity: "success",
              summary: "Validar",
              detail: "Nota procesada",
              life: 2000
            });

            this.clearFile()
          }
        },
        error: (e) => {
          //console.log(e);
          let error = `${e.error}`
          this.messageService.add({
            severity: "error",
            summary: "Error",
            detail: error,
            life: 2000
          });

          this.errorMEssageFile = error;

          this.clearFile(false)
        }

      })
      this.isLoadingFacturas = false;
      this.isClear = true;
    } catch (err) {
      console.log(err);
      this.messageService.add({
        severity: "error",
        summary: "Error",
        detail: String(err)
      });
    }

  }

  clearFile(exito: boolean = true) {
    if(exito) {
      this.idProyecto = null
    }
    this.isClear = !this.isClear
    this.fileUpload.clear();
    this.listResponse = new Array<ResponseXML>();
    this.errorMEssageFile = '';
    this.listFacturasBase64 = new Array<LstFacturas>();
    this.listResponse = new Array<ResponseXML>();
  }

}
