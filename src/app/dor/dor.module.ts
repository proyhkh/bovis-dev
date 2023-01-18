import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DorRoutingModule } from './dor-routing.module';
import { DorComponent } from './container/dor.component';
import { DorCrudComponent } from './components/dor-crud/dor-crud.component';
import { NgbPaginationModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ToastModule } from 'primeng/toast';
import { DropdownModule } from 'primeng/dropdown';
import { ProgressBarModule } from 'primeng/progressbar';
import { ConfirmationService, MessageService } from 'primeng/api';
import {InputTextModule} from 'primeng/inputtext';
import {InputNumberModule} from 'primeng/inputnumber';

import {TableModule} from 'primeng/table';
import {ButtonModule} from 'primeng/button';
import { DorService } from './Services/dor.service';
import { DorCapturaComponent } from './components/dor-captura/dor-captura.component';
import { TooltipModule } from 'primeng/tooltip';
import { DorObjetivosComponent } from './components/dor-objetivos/dor-objetivos.component';

@NgModule({
  declarations: [
    DorComponent,
    DorCrudComponent,
    DorCapturaComponent,
    DorObjetivosComponent
  ],
  imports: [
    CommonModule,
    DorRoutingModule,
    FormsModule,
    NgbPaginationModule,
    ConfirmPopupModule,
    ToastModule,
    NgbTooltipModule,
    DropdownModule,
    ProgressBarModule,
    InputTextModule,
    InputNumberModule,
    TableModule,
    ButtonModule,
    TooltipModule,
  ],
  providers: [ConfirmationService, MessageService, DorService]
})
export class DorModule { }
