import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DorService } from '../../Services/dor.service';
import { Objetivos, Subordinados, SubordinadosComplemento } from '../../Models/subordinados';


interface EmpleadosSub {
  name: string,
  value: string
}

@Component({
  selector: 'app-dor-obj',
  templateUrl: './dor-obj.component.html',
  styleUrls: ['./dor-obj.component.css']
})
export class DorObjComponent implements OnInit {

  isConsulta = true;
  isObjetivos = false;
  empleadosSub: EmpleadosSub[] = [];
  products2: Objetivos[];
  userMail: string | null = '';
  listSubordinados: Subordinados[];
  listObjetivos: Objetivos[];
  subComple: SubordinadosComplemento = new SubordinadosComplemento();
  clonedObjetivos: { [s: string]: Objetivos; } = {};

  constructor(private docService: DorService, private messageService: MessageService) {
    //console.log(localStorage.getItem('userMail'));
    this.userMail = localStorage.getItem('userMail');
  }

  ngOnInit(): void {

    this.docService.getDatosEjecutivo(this.userMail).subscribe(data => {
      //console.log(data);
      const str = 'data' as any;
      let datos = data[str as keyof typeof data];
      //console.log(datos['nombre' as keyof typeof datos]);
      let nombre = datos['nombre' as keyof typeof datos];
      this.docService.getDatosSubordinados(nombre).subscribe(dataSub => {
        //console.log(dataSub);
        this.listSubordinados = <Subordinados[]>dataSub.data;
        //console.log(this.listSubordinados);
        this.listSubordinados.forEach(element => {
          this.empleadosSub.push({ name: element.nombre, value: element.nombre })
        });
      });
    });

  }

  onChangeEmpleado(event: any) {
    /*console.log('event :' + event);
     console.log(event.value);*/
    if (event.value) {
      let select = <EmpleadosSub>event.value
      //console.log(select);
      //console.log(this.listSubordinados);
      //console.log(this.listSubordinados.find(xx => xx.nombre == select.value));
      let subordinado = this.listSubordinados.find(xx => xx.nombre == select.value);
      //console.log(subordinado);
      this.subComple.proyecto = subordinado?.proyecto || '';
      this.subComple.numEmpleado = subordinado?.centrosdeCostos || '';
      this.subComple.unidadNegocio = 'OPERACIONES';
      this.subComple.concepto = 'CUALITATIVOS';
      this.docService.getObjetivosByProyecto('2023', this.subComple.numEmpleado, 'CUALITATIVOS').subscribe(data3 => {
        this.listObjetivos = data3.data;
        this.products2 = data3.data;
        this.isObjetivos = true;
        let numId = 1;
        this.listObjetivos.forEach(element => {
          element.id = numId.toString();
          //element.Empleado = '10003';
          numId++;
        });
        let numId2 = 1;
        this.products2.forEach(element => {
          element.id = numId2.toString();
          //element.Empleado = '10003';
          numId2++;
        });
        console.log(this.listObjetivos);
      });
    }
  }

  getSubordinados() {
    this.docService.getDatosSubordinados('').subscribe(data => {

    });
  }

  getObjetivosProyectos() {
    /* this.docService.getObjetivosByProyecto().subscribe(data => {

    }); */
  }


  saveObjetivo(objetivo: Objetivos) {

    objetivo.Empleado = this.subComple.numEmpleado;
    objetivo.Proyecto= this.subComple.proyecto;

    this.docService.updateObjetivos(objetivo).subscribe(udt => {
      console.log(udt);
      delete this.clonedObjetivos[objetivo.id];
      this.messageService.add({severity:'success', summary: 'Actualización', detail: 'Registro actualizado correctamente'});
    });
  }

  onRowEditInit(product: Objetivos) {
    this.clonedObjetivos[product.id] = { ...product };
  }

  onRowEditSave(product: Objetivos) {
    //console.log(product);
    if (product.meta != '') {
      this.saveObjetivo(product);
        /* delete this.clonedObjetivos[product.id];
        this.messageService.add({severity:'success', summary: 'Success', detail:'Product is updated'}); */
    }
    else {
        this.messageService.add({severity:'error', summary: 'Error', detail:'Campo Meta Requerido'});
    }
  }

  onRowEditCancel(product: Objetivos, index: number) {
    /* console.log(product);
    console.log(index); */

    this.products2[index] = this.clonedObjetivos[product.id];
    delete this.clonedObjetivos[product.id];
  }


}
