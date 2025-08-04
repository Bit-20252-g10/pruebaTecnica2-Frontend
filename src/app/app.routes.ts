import { Routes } from '@angular/router';
import { DepartamentoEmpleadosComponent } from './components/departamento-empleados/departamento-empleados';
import { EmpleadoFormComponent } from './components/empleado-form/empleado-form';
import { DepartamentoFormComponent } from './components/departamento-form/departamento-form';

export const routes: Routes = [
  { path: '', redirectTo: 'departamentos-empleados', pathMatch: 'full' },
  { path: 'departamentos-empleados', component: DepartamentoEmpleadosComponent },
  { path: 'empleados', component: EmpleadoFormComponent },
  { path: 'departamentos', component: DepartamentoFormComponent },
];