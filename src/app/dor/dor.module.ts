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

@NgModule({
  declarations: [
    DorComponent,
    DorCrudComponent
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
    ButtonModule
  ],
  providers: [ConfirmationService, MessageService]
})
export class DorModule { }
