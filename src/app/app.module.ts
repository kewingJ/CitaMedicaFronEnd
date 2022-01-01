import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';

import LocaleEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
import { AddCitaComponent } from './components/add-cita/add-cita.component';
registerLocaleData(LocaleEs, 'es');

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DoctorComponent } from './components/doctor/doctor.component';
import { DatePipe } from '@angular/common';
import { AddDisponibilidadComponent } from './components/add-disponibilidad/add-disponibilidad.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    AddCitaComponent,
    DoctorComponent,
    AddDisponibilidadComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'es' }, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
