import { Component, OnInit } from '@angular/core';
import { DorService } from '../../Services/dor.service';
import { Objetivos, ObjetivosGenerales, Subordinados } from '../../Models/subordinados';

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

  constructor(private dorService: DorService) {
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

      this.dorService.getObjetivosGenerales(this.empleado.nivel ||'').subscribe(generales => {
        this.listObjGenrales = generales.data;
        //console.log(this.listObjGenrales);
        this.getTablasObjetivosGenerales();
      });
    });
  }

  getTablasObjetivosGenerales(){

    let tipos = this.listObjGenrales.map(item => item.concepto)
    .filter((value, index, self) => self.indexOf(value) === index);
    this.tiposTablasObjGenerales = tipos;
    this.listObjGenralesTipoUno = this.listObjGenrales.filter(xx => xx.concepto == tipos[0]);
    this.listObjGenralesTipoDos = this.listObjGenrales.filter(xx => xx.concepto == tipos[1]);
  }

}
