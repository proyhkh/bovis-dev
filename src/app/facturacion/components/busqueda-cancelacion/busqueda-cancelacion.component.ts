import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { Busqueda, BusquedaCancelacion } from '../../Models/FacturacionModels';
import { FacturacionService } from '../../services/facturacion.service';
//import * as FileSaver from 'file-saver';
//import { FileSaver } from 'file-saver';
//import * as XLSX from 'xlsx';

@Component({
  selector: 'app-busqueda-cancelacion',
  templateUrl: './busqueda-cancelacion.component.html',
  styleUrls: ['./busqueda-cancelacion.component.css'],
})
export class BusquedaCancelacionComponent implements OnInit {
  objBusqueda: Busqueda = new Busqueda();
  listBusquedaCompleto: Array<BusquedaCancelacion> =
    new Array<BusquedaCancelacion>();
  listBusquedaUnique: Array<BusquedaCancelacion> =
    new Array<BusquedaCancelacion>();

  constructor(
    private config: PrimeNGConfig,
    private facturacionService: FacturacionService
  ) {}

  ngOnInit(): void {
    this.getConfigCalendar();
    this.listBusquedaCompleto =
    new Array<BusquedaCancelacion>();
  this.listBusquedaUnique =
    new Array<BusquedaCancelacion>();
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

  busqueda() {
    var utc = new Date().toJSON().slice(0, 10).replace(/-/g, '-');
    //console.log(utc);

    this.objBusqueda.fechaFin = utc;
    console.log(this.objBusqueda);

    this.facturacionService.getBusqueda(this.objBusqueda).subscribe((bus) => {
      //console.log(bus);
      this.listBusquedaCompleto = bus.data;
      console.log(this.listBusquedaCompleto);
      this.listBusquedaUnique = [
        ...new Map(
          this.listBusquedaCompleto.map((item) => [item['numProyecto'], item])
        ).values(),
      ];
      console.log(this.listBusquedaUnique);
    });
  }

  getHeadersTabla() {
    return [
      'UUID',
      'Num Proyecto',
      'ID Tipo Factura',
      'ID Moneda',
      'Importe',
      'Iva',
      'IvaRet',
      'Total',
      'Concepto',
      'Mes',
      'Año',
      'Fecha Emision',
      'Fecha Pago',
      'Fecha Cancelacion',
      'No Factura',
      'Tipo Cambio',
      'Motivo Cancelacion',
      'NC Uuid Nota Credito',
      'NC Id Moneda',
      'NC Id Tipo Relacion',
      'NC Nota Credito',
      'NC Importe',
      'NC Iva',
      'NC Total',
      'NC Concepto',
      'NC Mes',
      'NC Año',
      'NC Tipo Cambio',
      'NC Fecha Nota Credito',
      'C Uuid Cobranza',
      'C Id MonedaP',
      'C Importe Pagado',
      'C Imp Saldo Ant',
      'C Importe Saldo Insoluto',
      'C Iva P',
      'C Tipo Cambio P',
      'C Fecha Pago',
    ];
  }

  exportExcel() {
    console.log(111);

    /* import('xlsx').then(xlsx => {
        const worksheet = xlsx.utils.json_to_sheet(this.listBusquedaCompleto);
        const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, "products");
    }); */
    /* pass here the table id */
    //let element = document.getElementById(this.listBusquedaCompleto);


    /* const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(this.listBusquedaCompleto);

   // generate workbook and add the worksheet
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

  // save to file
    XLSX.writeFile(wb, "Facturacion"); */
}

saveAsExcelFile(buffer: any, fileName: string): void {
 /*  let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  let EXCEL_EXTENSION = '.xlsx';
  const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
  });
  FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION); */
}

}
