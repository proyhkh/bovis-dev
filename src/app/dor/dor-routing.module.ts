import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DorComponent } from './container/dor.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { MsalInterceptor } from '@azure/msal-angular';
import { DorCapturaComponent } from './components/dor-captura/dor-captura.component';

const routes: Routes = [
  { path: '', component: DorComponent },
  { path: 'captura', component: DorCapturaComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: MsalInterceptor,
    multi: true
  },],
  exports: [RouterModule]
})
export class DorRoutingModule { }
