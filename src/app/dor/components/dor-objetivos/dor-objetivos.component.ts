import { Component, OnInit } from '@angular/core';
import { DorService } from '../../Services/dor.service';
import { Objetivos, ObjetivosGenerales, Subordinados } from '../../Models/subordinados';
import { ConfirmationService, Message, MessageService, PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-dor-objetivos',
  templateUrl: './dor-objetivos.component.html',
  styleUrls: ['./dor-objetivos.component.css']
})
export class DorObjetivosComponent implements OnInit {
  userMail: string | null = '';
  isConsulta = true;
  empleado: Subordinados = new Subordinados();
  listObjGenrales: ObjetivosGenerales[];
  listObjGenralesTipoUno: ObjetivosGenerales[];
  listObjGenralesTipoDos: ObjetivosGenerales[];
  tiposTablasObjGenerales: any;
  listObjetivos: Objetivos[];
  msgs: Message[] = [];

  constructor(private dorService: DorService, private confirmationService: ConfirmationService,
    private primengConfig: PrimeNGConfig, private messageService: MessageService,) {
    this.userMail = localStorage.getItem('userMail');
  }

  ngOnInit(): void {
    //console.log(this.userMail);
    this.dorService.getDatosEmpleado(this.userMail).subscribe(emp => {
      this.empleado = emp.data || new Subordinados();
      console.log(this.empleado);
      this.dorService.getObjetivosByProyecto('2023', this.empleado.centrosdeCostos || '', this.empleado.noEmpleado || '').subscribe(objetivos => {
        this.listObjetivos = objetivos.data;
        //console.log(this.listObjetivos);
      });

      this.dorService.getObjetivosGenerales(this.empleado.nivel || '', this.empleado.unidadDeNegocio || '').subscribe(generales => {
        this.listObjGenrales = generales.data;
        //console.log(this.listObjGenrales);
        this.getTablasObjetivosGenerales();
      });
    });
  }

  getTablasObjetivosGenerales() {

    let tipos = this.listObjGenrales.map(item => item.concepto)
      .filter((value, index, self) => self.indexOf(value) === index);
    this.tiposTablasObjGenerales = tipos;
    this.listObjGenralesTipoUno = this.listObjGenrales.filter(xx => xx.concepto == tipos[0]);
    this.listObjGenralesTipoDos = this.listObjGenrales.filter(xx => xx.concepto == tipos[1]);
  }

  confirm1() {
    this.confirmationService.confirm({
      message: 'Apruebas todos los objetivos?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Aceptar',
      rejectLabel: 'Cancelar',
      accept: () => {
        this.messageService.add({
          severity: "success",
          summary: "Dor",
          detail: "Objetivos aprobados correctamente"
        });
        /*  this.msgs = [{severity:'info', summary:'Confirmed', detail:'You have accepted'}]; */
      },
      reject: () => {
        this.messageService.add({
          severity: "warn",
          summary: "Dor",
          detail: "Acción cancelada"
        });
        /* this.msgs = [{severity:'info', summary:'Rejected', detail:'You have rejected'}]; */
      }
    });
  }


}
