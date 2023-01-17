import { Component, OnInit } from '@angular/core';
import { DorService } from '../../Services/dor.service';

@Component({
  selector: 'app-dor-objetivos',
  templateUrl: './dor-objetivos.component.html',
  styleUrls: ['./dor-objetivos.component.css']
})
export class DorObjetivosComponent implements OnInit {
  userMail: string | null = '';

  constructor(private dorService: DorService) {
    this.userMail = localStorage.getItem('userMail');
   }

  ngOnInit(): void {
    //console.log(this.userMail);
    this.dorService.getDatosEmpleado("alma.ramirez@bovis.mx").subscribe(data => {
      console.log(data);

    });
  }
}
