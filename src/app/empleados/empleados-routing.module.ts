import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmpleadosRegistroComponent } from './components/empleados-registro/empleados-registro.component';
import { EmpleadosComponent } from './container/empleados.component';

const routes: Routes = [
  { path: '', component: EmpleadosComponent},
  { path: 'registro', component: EmpleadosRegistroComponent},
  { path: 'edicion/:id', component: EmpleadosRegistroComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmpleadosRoutingModule { }
