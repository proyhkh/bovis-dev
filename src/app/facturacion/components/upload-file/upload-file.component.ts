import { Component, OnInit, ViewChild } from '@angular/core';
import { FacturacionService } from '../../services/facturacion.service';
import { CargaFile, ResponseXML } from '../../Models/FacturacionModels';
import { Observable, ReplaySubject } from 'rxjs';
import { MessageService } from 'primeng/api';
import { faL } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss']
})
export class UploadFileComponent implements OnInit {

  fileSizeMax = 1000000;
  fileBase64: CargaFile = new CargaFile();
  constructor(private cargaFileServ: FacturacionService,
     private messageService: MessageService,
     private msgs : MessageService) { }
  strFileBase64: string = '';
  isClear: boolean = false;
  @ViewChild('fileUpload') fileUpload: any;
  listResponse: Array<ResponseXML> = new Array<ResponseXML>();
  errorMEssageFile: string = '';
  ngOnInit(): void {
  }

  async onBasicUpload(event: any) {
    if (event && event.files) {
      this.convertXML(event.files[0]);
    }
    this.isClear = true;
  }

  convertXML(file: File) {
    const reader = new FileReader();
    reader.onload = (evt) => {
      const xmlData: string = (evt as any).target.result;
      //console.log(xmlData);
      var parser = new DOMParser();
      var xmlz = parser.parseFromString(xmlData, "application/xml");
      //console.log(window.btoa((new XMLSerializer()).serializeToString(xmlz)));
      this.strFileBase64 = window.btoa((new XMLSerializer()).serializeToString(xmlz));
      this.cargaFile(this.strFileBase64);
    };
    reader.readAsText(file);
  }

  cargaFile(file: string) {

    this.fileBase64.B64Xml = file;
    try {
      this.cargaFileServ.cargaXML(this.fileBase64).subscribe({
        next: (data) => {
          //console.log(data);
          if(data.success){
            this.listResponse.push(data.data);
            //console.log( this.listResponse);
            this.messageService.add({
              severity: "success",
              summary: "Validar",
              detail: "Archivo validado correctamente",
              life: 2000
            });
          }
        },
        error: (e) => {
          //console.log(e);
          let error = `${e.message} \n\n ${e.error}`
          this.messageService.add({
            severity: "error",
            summary: "Error",
            detail: error,
            life: 2000
          });

         this.errorMEssageFile = error;
        }
      })
    } catch (err) {
      console.log(err);
      this.messageService.add({
        severity: "error",
        summary: "Error",
        detail: String(err)
      });
    }

  }

  clearFile() {
    this.isClear = !this.isClear
    this.fileUpload.clear();
    this.listResponse = new Array<ResponseXML>();
    this.errorMEssageFile = '';
  }

}
