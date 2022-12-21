import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmpleadosRoutingModule } from './empleados-routing.module';
import { EmpleadosComponent } from './container/empleados.component';
import { EmpleadosRegistroComponent } from './components/empleados-registro/empleados-registro.component';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    EmpleadosComponent,
    EmpleadosRegistroComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    EmpleadosRoutingModule,
    NgbDatepickerModule,
    FontAwesomeModule
  ],
  exports:[
    /* NgbDatepickerModule */
  ]
})
export class EmpleadosModule { }
