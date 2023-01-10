import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DorComponent } from './container/dor.component';
import { DorCrudComponent } from './components/dor-crud/dor-crud.component';
import { DorObjComponent } from './components/dor-obj/dor-obj.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { MsalInterceptor } from '@azure/msal-angular';

const routes: Routes = [
  { path: '', component: DorComponent },
  { path: 'objetivos', component: DorObjComponent },
  { path: 'registro', component: DorCrudComponent },
  { path: 'edicion/:id', component: DorCrudComponent },
  { path: 'consulta/:id', component: DorCrudComponent }
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
