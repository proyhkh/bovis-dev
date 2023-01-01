import { Component, OnInit } from '@angular/core';
import { Dor } from '../../Models/dor';
import { ActivatedRoute, Router } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';

interface Conceptos {
  name: string,
  value: string
}

@Component({
  selector: 'app-dor-crud',
  templateUrl: './dor-crud.component.html',
  styleUrls: ['./dor-crud.component.css']
})
export class DorCrudComponent implements OnInit {

  isConsulta: boolean = false;
  conceptos: Conceptos[];
  selectedConcepto: Conceptos;
  regDor: Dor = new Dor();
  isEditar = true;
  idDor: number;

  constructor(private router: Router, private params: ActivatedRoute, private config: PrimeNGConfig) {

    this.poblarConcepto();
    this.params.paramMap.subscribe(responseData => {
      this.params.snapshot.routeConfig?.path && this.params.snapshot.routeConfig?.path.includes('consulta') ? this.isConsulta = true : this.isConsulta = false;
      //this.idVoto = responseData.get("id")
      //console.log(responseData.get("id"));
      if (responseData.get("id")) {
        this.idDor = Number(responseData.get("id"));
        this.poblarCampos();
        this.isEditar = true;
      }
      else {
        this.isEditar = false;
      }
    });

   }

   poblarCampos() {
    let ListDorModel: Dor[] = [];
    ListDorModel = JSON.parse(localStorage.getItem("dor") || "[]");
    //console.log(ListEmpleadosModel);
    this.regDor = <Dor>ListDorModel.find(xx => xx.id == this.idDor);
    console.log(this.regDor);

    this.selectedConcepto = <Conceptos>this.conceptos.find(xx => xx.value == this.regDor.concepto);
  }

  poblarConcepto(){
    this.conceptos = [
      { name: 'CORPORATIVO', value: 'CORPORATIVO' },
      { name: ' PROYECTO', value: ' PROYECTO' },
      { name: 'CUALITATIVOS', value: 'CUALITATIVOS' }
    ];
  }

  ngOnInit(): void {



  }

  guardar() {

    let ListDorModel: Dor[] = [];

    if (!localStorage.getItem("idDorTemp")) {
      //console.log('ssssss');
      localStorage.setItem("idDorTemp", "0");
    }

    console.log(this.selectedConcepto);
    if (this.selectedConcepto) {
      this.regDor.concepto = this.selectedConcepto.value;
    }
    console.log(this.regDor);

    if (localStorage.getItem("dor") != null) {
      ListDorModel = JSON.parse(localStorage.getItem("dor") || "[]");
    }

    if (this.isEditar) {
      //Editar
      const index = ListDorModel.findIndex(obj => obj.id == this.idDor)
      if (index > -1) {
        ListDorModel.splice(index, 1);
      }
    }

    if (this.idDor == undefined || this.idDor) {
      let id: string | null = localStorage.getItem("idDorTemp");
      console.log(id);
      this.idDor = Number(id) + 1;
      localStorage.setItem("idDorTemp", String(this.idDor));
    }

    this.regDor.id = this.idDor;

    ListDorModel.push(this.regDor)
    localStorage.setItem("dor", JSON.stringify(ListDorModel));

    this.router.navigateByUrl('/dor')

  }

  clear() {
    localStorage.removeItem("dor");
  }

}
