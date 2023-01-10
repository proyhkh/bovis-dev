import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';

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
  constructor( private messageService: MessageService) {

    console.log(localStorage.getItem('userMail'));

   }

  ngOnInit(): void {
  }

}
