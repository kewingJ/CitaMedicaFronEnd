import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { AddCitaComponent } from './components/add-cita/add-cita.component';
import { DoctorComponent } from './components/doctor/doctor.component';
import { AddDisponibilidadComponent } from './components/add-disponibilidad/add-disponibilidad.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent },
  { path: 'add-cita', component: AddCitaComponent },
  { path: 'doctor', component: DoctorComponent },
  { path: 'add-disponibilidad', component: AddDisponibilidadComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
