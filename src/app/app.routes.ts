import { Routes } from '@angular/router';
import { Bienvenidos } from './page/bienvenidos/bienvenidos';
import { PrincipalAlumno } from './page/abmAlumno/principal-alumno/principal-alumno';
import { Error } from './page/error/error';
import { Ingreso } from './page/ingreso/ingreso';
import { Binding } from './page/binding/binding';
import { PaisesListadoComponent } from './page/paises-listado/paises-listado';

export const routes: Routes = [
  { path: '', component: Bienvenidos },              
  { path: 'alumnos', component: PrincipalAlumno },  
  { path: 'ingreso', component: Ingreso },  
  { path: 'binding', component: Binding },  
  { path: 'paises', component: PaisesListadoComponent },  
  { path: '**', component: Error }         // Wildcard - always last
];
