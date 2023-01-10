import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DorService } from '../../Services/dor.service';

interface Empleados {
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
  isObjetivos = true;
  empleados: Empleados[];
  products2: any[];
  userMail: string | null = '';
  constructor(private docService: DorService, private messageService: MessageService) {

    console.log(localStorage.getItem('userMail'));
    this.userMail = localStorage.getItem('userMail');

  }

  ngOnInit(): void {

    this.docService.getDatosEjecutivo(this.userMail).subscribe(data => {

    });

  }

  getSubordinados(){
    this.docService.getDatosSubordinados('').subscribe(data => {

    });
  }

  getObjetivosProyectos(){
    this.docService.getObjetivosByProyecto().subscribe(data => {

    });
  }



}
