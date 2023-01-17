import { Component, OnInit } from '@angular/core';
import { Objetivos, ObjetivosGenerales, Subordinados } from '../../Models/subordinados';
import { DorService } from '../../Services/dor.service';
import { MessageService } from 'primeng/api';

interface EmpleadosSub {
  name: string,
  value: string
}

@Component({
  selector: 'app-dor-captura',
  templateUrl: './dor-captura.component.html',
  styleUrls: ['./dor-captura.component.css']
})
export class DorCapturaComponent implements OnInit {

  isConsulta = true;
  isObjetivos = false;
  empleadosSub: EmpleadosSub[] = [];
  products2: Objetivos[];
  userMail: string | null = '';
  listSubordinados: Subordinados[];
  listObjetivos: Objetivos[];
  subComple: Subordinados = new Subordinados();
  clonedObjetivos: { [s: string]: Objetivos; } = {};
  listObjGenrales: ObjetivosGenerales[];
  listObjGenralesTipoUno: ObjetivosGenerales[];
  listObjGenralesTipoDos: ObjetivosGenerales[];
  tiposTablasObjGenerales: any;

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
          this.empleadosSub.push({ name: String(element.nombre), value: String(element.nombre) })
        });
      });
    });
  }

  onChangeEmpleado(event: any) {
    /*console.log('event :' + event);
     console.log(event.value);*/
    if (event.value) {
      let select = <EmpleadosSub>event.value
      //console.log(this.listSubordinados);
      let subordinado = this.listSubordinados.find(xx => xx.nombre == select.value) ?? {};
      console.log(subordinado);
      this.subComple.proyecto = subordinado?.proyecto || '';
      this.subComple.noEmpleado = subordinado?.noEmpleado || '';
      this.subComple.unidadDeNegocio = subordinado?.unidadDeNegocio || '';
      this.subComple.direccionEjecutiva = subordinado?.direccionEjecutiva || '';
      this.subComple.centrosdeCostos = subordinado?.centrosdeCostos || '';
      this.docService.getObjetivosByProyecto('2023', this.subComple.centrosdeCostos, this.subComple.noEmpleado).subscribe(objetivos => {
        this.listObjetivos = objetivos.data;
        this.products2 = objetivos.data;
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
        //console.log(this.listObjetivos);

      });
      let nivel: string = subordinado.nivel ?? ""
      this.docService.getObjetivosGenerales(nivel).subscribe(generales => {
        this.listObjGenrales = generales.data;
        //console.log(this.listObjGenrales);
        this.getTablasObjetivosGenerales();
      });

    }
  }

  getTablasObjetivosGenerales(){

    let tipos = this.listObjGenrales.map(item => item.concepto)
    .filter((value, index, self) => self.indexOf(value) === index);
    //console.log(tipos);
    //console.log(tipos[1]);
    this.tiposTablasObjGenerales = tipos;
    this.listObjGenralesTipoUno = this.listObjGenrales.filter(xx => xx.concepto == tipos[0]);
    this.listObjGenralesTipoDos = this.listObjGenrales.filter(xx => xx.concepto == tipos[1]);
    /* console.log(this.listObjGenralesTipoUno);
    console.log(this.listObjGenralesTipoDos); */
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
    /* objetivo.Proyecto = this.subComple.proyecto;
    objetivo.Empleado = this.subComple.noEmpleado; */
    //objetivo.Acepto = '0';
    this.docService.updateObjetivos(objetivo).subscribe(udt => {
      console.log(udt);
      let mensaje: string = udt.message;
      if (udt.message == null) {
        delete this.clonedObjetivos[objetivo.id];
        this.messageService.add({ severity: 'success', summary: 'Meta', detail: 'Almacenado correctamente' });
      }
      else if (mensaje.includes('error')) {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: mensaje });
      }
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
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Campo Meta Requerido' });
    }
  }

  onRowEditCancel(product: Objetivos, index: number) {
    /* console.log(product);
    console.log(index); */

    this.products2[index] = this.clonedObjetivos[product.id];
    delete this.clonedObjetivos[product.id];
  }

}
