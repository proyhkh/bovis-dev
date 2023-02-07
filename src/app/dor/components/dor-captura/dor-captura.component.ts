import { Component, OnInit } from '@angular/core';
import { Objetivos, ObjetivosGenerales, Subordinados, EstatusObjetivosPorProyecto, MensajesObjetivosCualitativos } from '../../Models/subordinados';
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
  objetivos2: Objetivos[];
  userMail: string | null = '';
  listSubordinados: Subordinados[];
  listObjetivos: Objetivos[];
  subComple: Subordinados = new Subordinados();
  clonedObjetivos: { [s: string]: Objetivos; } = {};
  listObjGenrales: ObjetivosGenerales[];
  listObjGenralesTipoUno: ObjetivosGenerales[];
  listObjGenralesTipoDos: ObjetivosGenerales[];
  tiposTablasObjGenerales: any;
  totalObjetivosTipoUno: number = 0;
  totalObjetivosTipoDos: number = 0;
  totalObjetivosCualitativos: number = 0;
  totalObjetivosGeneral: number = 0;
  msgs: any = [];
  mensaje_sin_datos = MensajesObjetivosCualitativos.sin_datos_captura;
  motivoRechazoObjetivos: string = '';
  isMotivoRechazo: boolean = false;

  constructor(private docService: DorService, private messageService: MessageService) {
    //console.log(localStorage.getItem('userMail'));
    this.userMail = localStorage.getItem('userMail');
  }

  ngOnInit(): void {
    this.getInicialDatosEjecutivo();
  }

  getInicialDatosEjecutivo() {
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
      this.clearPorcentajes();
      let select = <EmpleadosSub>event.value
      //console.log(this.listSubordinados);
      let subordinado = this.listSubordinados.find(xx => xx.nombre == select.value) ?? {};
      //console.log(subordinado);
      this.subComple.proyecto = subordinado?.proyecto || '';
      this.subComple.noEmpleado = subordinado?.noEmpleado || '';
      this.subComple.unidadDeNegocio = subordinado?.unidadDeNegocio || '';
      this.subComple.direccionEjecutiva = subordinado?.direccionEjecutiva || '';
      this.subComple.centrosdeCostos = subordinado?.centrosdeCostos || '';

      this.getObjetivosPorProyecto('2023', this.subComple.centrosdeCostos, this.subComple.noEmpleado, subordinado.nivel || '', EstatusObjetivosPorProyecto.inicial, true);
      this.docService.getObjetivosGenerales(subordinado.nivel || '', subordinado?.unidadDeNegocio || '').subscribe(generales => {
        this.listObjGenrales = generales.data;
        //console.log(this.listObjGenrales);
        this.getTablasObjetivosGenerales();
      });
    }
  }

  clearPorcentajes(){
    this.totalObjetivosTipoUno = 0;
    this.totalObjetivosTipoDos = 0;
    this.totalObjetivosCualitativos = 0;
    this.totalObjetivosGeneral = 0;
  }

  getObjetivosPorProyecto(anio: string, numProyecto: string, noEmpleado: string, nivel: string, tipo: number, isRecursivo: boolean) {

    this.docService.getObjetivosByProyecto(anio, numProyecto, noEmpleado, nivel, tipo).subscribe(objetivos => {

      if (objetivos.data.length == 0 && isRecursivo) {
        this.listObjetivos = [];
        this.objetivos2 = [];
        this.getObjetivosPorProyecto(anio, numProyecto, noEmpleado, nivel, EstatusObjetivosPorProyecto.rechazado_por_empleado, false);
      }
      else {
        this.listObjetivos = objetivos.data;
        this.objetivos2 = objetivos.data;
        this.isObjetivos = true;
        let numId = 1;
        this.listObjetivos.forEach(obj => {
          obj.id = numId.toString();
          numId++;
          obj.descripcion == 'Sustentabilidad?' ? obj.isComodin = true : obj.isComodin = false;
          obj.descripcion?.includes('Evaluación 360°') ? obj.isEditable = true : obj.isEditable = false;

          this.totalObjetivosCualitativos += Number(obj.valor || '');

          if(obj.motivoR != null && obj.motivoR != ''){
            this.motivoRechazoObjetivos = obj.motivoR;
            this.isMotivoRechazo = true;
          }
          else{
            this.motivoRechazoObjetivos = '';
            this.isMotivoRechazo = false;
          }

        });
        let numId2 = 1;
        this.objetivos2.forEach(obj => {
          obj.id = numId2.toString();
          //element.Empleado = '10003';
          numId2++;
        });
        //console.log(this.listObjetivos);
      }
    });

  }

  getTablasObjetivosGenerales() {

    let tipos = this.listObjGenrales.map(item => item.concepto)
      .filter((value, index, self) => self.indexOf(value) === index);

    let indiceCorporativo = tipos.indexOf('CORPORATIVO');
    //console.log(indiceCorporativo);
    if (indiceCorporativo == 1) {
      tipos = tipos.reverse();
    }
    this.tiposTablasObjGenerales = tipos;
    console.log(tipos);
    this.listObjGenralesTipoUno = this.listObjGenrales.filter(xx => xx.concepto == "CORPORATIVO");
    this.listObjGenralesTipoDos = this.listObjGenrales.filter(xx => xx.concepto != "CORPORATIVO");


    this.listObjGenralesTipoUno.forEach(obj => {
      this.totalObjetivosTipoUno += Number(obj.valor || '');
    });

    this.listObjGenralesTipoDos.forEach(obj => {
      this.totalObjetivosTipoDos += Number(obj.valor || '');
    });
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
    objetivo.acepto = '1';
    //console.log(objetivo);
    this.docService.updateObjetivos(objetivo).subscribe(udt => {
      console.log(udt);
      let mensaje: string = udt.message;
      if (udt.message == null) {
        delete this.clonedObjetivos[objetivo.id];
        this.asignarValorComodin();
        this.messageService.add({ severity: 'success', summary: 'Guardar', detail: 'Almacenado correctamente' });
      }
      else if (mensaje.includes('error')) {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: mensaje });
      }
    });
  }

  async saveAllObjetivos() {
     this.listObjetivos.forEach(async objetivo => {
      objetivo.acepto = '1';
      await this.docService.updateObjetivos(objetivo).subscribe(udt => {
        console.log(udt);
      });
    });
    console.log(2222);
    this.isObjetivos = false;
    this.messageService.add({ severity: 'success', summary: 'Guardar', detail: 'Todos los objetivos fueron almacenados correctamente' });
  }

  onRowEditInit(product: Objetivos) {
    this.clonedObjetivos[product.id] = { ...product };
  }

  asignarValorComodin() {

    this.listObjetivos.forEach(obj => {
      obj.descripcion == 'Sustentabilidad?' ? obj.isComodin = true : obj.isComodin = false;
    });
    this.objetivos2.forEach(obj => {
      obj.descripcion == 'Sustentabilidad?' ? obj.isComodin = true : obj.isComodin = false;
    });
  }

  onRowEditSave(objetivo: Objetivos) {
    //console.log(objetivo);
    if (objetivo.meta != '') {
      this.saveObjetivo(objetivo);
      /* delete this.clonedObjetivos[product.id];
      this.messageService.add({severity:'success', summary: 'Success', detail:'Product is updated'}); */
    }
    else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Campo Meta Requerido' });
    }
  }

  onRowEditCancel(objetivo: Objetivos, index: number) {
    /* console.log(product);
    console.log(index); */
    this.objetivos2[index] = this.clonedObjetivos[objetivo.id];
    delete this.clonedObjetivos[objetivo.id];
  }

}
