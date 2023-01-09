import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogosComponent } from './container/catalogos.component';
import { ViaticosComponent } from './components/viaticos/viaticos.component';

const routes: Routes = [
  { path: '', component: CatalogosComponent },
  { path: 'cat_viaticos', component: ViaticosComponent }
  /* { path: 'edicion/:id', component: DorCrudComponent },
  { path: 'consulta/:id', component: DorCrudComponent } */
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CatalogosRoutingModule { }
