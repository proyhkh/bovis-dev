import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmpleadosRoutingModule } from './empleados-routing.module';
import { EmpleadosComponent } from './container/empleados.component';
import { EmpleadosRegistroComponent } from './components/empleados-registro/empleados-registro.component';
// import { NgbAccordionModule, NgbDatepickerModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ToastModule } from "primeng/toast";
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ConfirmationService, MessageService } from "primeng/api";
// import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { DropdownModule } from 'primeng/dropdown';
import {ProgressBarModule} from 'primeng/progressbar';
import { CalendarModule } from 'primeng/calendar';

@NgModule({
  declarations: [
    EmpleadosComponent,
    EmpleadosRegistroComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    EmpleadosRoutingModule,
    // NgbDatepickerModule,
    FontAwesomeModule,
    // NgbTooltipModule,
    // NgbAccordionModule,
    ConfirmPopupModule,
    ToastModule,
    // NgbPaginationModule,
    DropdownModule,
    ProgressBarModule,
    CalendarModule
  ],
  exports:[

  ],
  providers: [ConfirmationService, MessageService]
})
export class EmpleadosModule { }
