import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { AccordionModule } from 'primeng/accordion';
import { MessagesModule } from 'primeng/messages';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';

import { PcsRoutingModule } from './pcs-routing.module';

import { IpComponent } from './components/ip/ip.component';
import { PcsComponent } from './container/pcs.component';
import { StaffingPlanComponent } from './components/staffing-plan/staffing-plan.component';
import { GastosComponent } from './components/gastos/gastos.component';
import { IngresosComponent } from './components/ingresos/ingresos.component';
import { ControlComponent } from './components/control/control.component';
import { PpaKpiComponent } from './components/ppa-kpi/ppa-kpi.component';
import { PrimengModule } from '../shared/primeng.module';
import { TabMenuModule } from 'primeng/tabmenu';
import { SeleccionarEmpleadoComponent } from './components/seleccionar-empleado/seleccionar-empleado.component';


@NgModule({
  declarations: [
    IpComponent,
    PcsComponent,
    StaffingPlanComponent,
    GastosComponent,
    IngresosComponent,
    ControlComponent,
    PpaKpiComponent,
    SeleccionarEmpleadoComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    PcsRoutingModule,
    ToastModule,
    AccordionModule,
    MessagesModule,
    DropdownModule,
    CalendarModule,
    ReactiveFormsModule,
    PrimengModule,
    TabMenuModule
  ],
  providers: [ConfirmationService, MessageService]
})
export class PcsModule { }
