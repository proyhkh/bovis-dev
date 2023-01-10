import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogosComponent } from './container/catalogos.component';
import { ViaticosComponent } from './components/viaticos/viaticos.component';
import { MsalGuard, MsalInterceptor } from '@azure/msal-angular';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

const routes: Routes = [
  { path: '', component: CatalogosComponent },
  { path: 'cat_viaticos', component: ViaticosComponent }
  /* { path: 'edicion/:id', component: DorCrudComponent },
  { path: 'consulta/:id', component: DorCrudComponent } */
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
export class CatalogosRoutingModule { }
