import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmpleadosRegistroComponent } from './components/empleados-registro/empleados-registro.component';
import { EmpleadosComponent } from './container/empleados.component';
import { PersonaRegistroComponent } from './components/persona-registro/persona-registro.component';

const routes: Routes = [
  { path: '', component: EmpleadosComponent},
  { path: 'registro-empleado', component: EmpleadosRegistroComponent},
  { path: 'registro-persona', component: PersonaRegistroComponent},
  { path: 'edicion/:id', component: EmpleadosRegistroComponent},
  { path: 'consulta/:id', component: EmpleadosRegistroComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmpleadosRoutingModule { }
