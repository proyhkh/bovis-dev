import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DorComponent } from './container/dor.component';
import { DorCrudComponent } from './components/dor-crud/dor-crud.component';

const routes: Routes = [
  { path: '', component: DorComponent },
  { path: 'registro', component: DorCrudComponent },
  { path: 'edicion/:id', component: DorCrudComponent },
  { path: 'consulta/:id', component: DorCrudComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DorRoutingModule { }
