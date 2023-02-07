import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FacturacionRoutingModule } from './facturacion-routing.module';
import { FacturacionComponent } from './container/facturacion.component';
import { UploadFileComponent } from './components/upload-file/upload-file.component';
import {FileUploadModule} from 'primeng/fileupload';
import {HttpClientModule} from '@angular/common/http';
import { FacturacionService } from './services/facturacion.service';
import {ButtonModule} from 'primeng/button';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import {TableModule} from 'primeng/table';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';


@NgModule({
  declarations: [
    FacturacionComponent,
    UploadFileComponent
  ],
  imports: [
    CommonModule,
    FacturacionRoutingModule,
    FileUploadModule,
    HttpClientModule,
    ButtonModule,
    ToastModule,
    TableModule,
    MessagesModule,
    MessageModule
  ],
  providers: [
    FacturacionService,
    MessageService
  ]
})
export class FacturacionModule { }