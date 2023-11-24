import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CieRoutingModule } from './cie-routing.module';
import { CieComponent } from './container/cie.component';
import { CargaSaeComponent } from './components/carga-sae/carga-sae.component';
import { ResultadoBusquedaComponent } from './components/resultado-busqueda/resultado-busqueda.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrimengModule } from '../shared/primeng.module';
import { ToastModule } from 'primeng/toast';
import { ModificarRegistroComponent } from './components/modificar-registro/modificar-registro.component';


@NgModule({
  declarations: [
    CieComponent,
    CargaSaeComponent,
    ResultadoBusquedaComponent,
    ModificarRegistroComponent
  ],
  imports: [
    CommonModule,
    CieRoutingModule,
    FormsModule,
    PrimengModule,
    ToastModule,
    ReactiveFormsModule
  ]
})
export class CieModule { }
