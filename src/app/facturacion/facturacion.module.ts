import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FacturacionRoutingModule } from './facturacion-routing.module';
import { FacturacionComponent } from './container/facturacion.component';
import { UploadFileComponent } from './components/upload-file/upload-file.component';
import {FileUploadModule} from 'primeng/fileupload';
import {HttpClientModule} from '@angular/common/http';
import { FacturacionService } from './services/facturacion.service';
import {ButtonModule} from 'primeng/button';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import {TableModule} from 'primeng/table';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {InputNumberModule} from 'primeng/inputnumber';
import { FormsModule } from '@angular/forms';
import { NotaCreditoComponent } from './components/nota-credito/nota-credito.component';
import { FacturaCrpComponent } from './components/factura-crp/factura-crp.component';
import { BusquedaCancelacionComponent } from './components/busqueda-cancelacion/busqueda-cancelacion.component';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { TooltipModule } from 'primeng/tooltip';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import {DynamicDialogModule} from 'primeng/dynamicdialog';


@NgModule({
  declarations: [
    FacturacionComponent,
    UploadFileComponent,
    NotaCreditoComponent,
    FacturaCrpComponent,
    BusquedaCancelacionComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    FacturacionRoutingModule,
    FileUploadModule,
    HttpClientModule,
    ButtonModule,
    ToastModule,
    TableModule,
    MessagesModule,
    MessageModule,
    InputNumberModule,
    DropdownModule,
    CalendarModule,
    TooltipModule,
    DialogModule,
    ConfirmDialogModule,
    ConfirmPopupModule,
    DynamicDialogModule
  ],
  providers: [
    ConfirmationService,
    FacturacionService,
    MessageService
  ]
})
export class FacturacionModule { }
