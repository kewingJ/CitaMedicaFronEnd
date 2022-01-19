import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cita } from '../models/cita.model';
import { Usuario } from '../models/usuario.model';
import { Disponibilidad } from '../models/disponibilidad.model';
import { HttpHeaders } from '@angular/common/http';

const baseUrl = 'http://localhost:8080/citasMedicasBackBean-1.0-SNAPSHOT';


let user = localStorage.getItem('username');
let pass = localStorage.getItem('password');

let authorizationData = 'Basic ' + btoa(user + ':' + pass);

const headerOptions = {
  headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': authorizationData
  })
};

@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  constructor(private http: HttpClient) { }

  getCitasPaciente(id: any): Observable<Cita[]> {
    return this.http.get<Cita[]>(`${baseUrl}/appointment/today/${id}`, headerOptions );
  }

  deleteCitaPaciente(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/appointment/${id}`, headerOptions);
  }

  obtenerListaDoctores(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${baseUrl}/appointment/doctores`, headerOptions);
  }

  getDisponibilidadDoctor(idDoctor: string, fecha: string): Observable<Disponibilidad[]> {
    return this.http.get<Disponibilidad[]>(baseUrl+'/schedule?idUser='+idDoctor+'&fecha='+fecha+'&rol=paciente', headerOptions);
  }

  saveCita(usuarioPaciente: Usuario, usuarioDoctor: Usuario, fechaCita: string): Observable<any> {
    return this.http.post(`${baseUrl}/appointment`,{
      usuarioPaciente,
      usuarioDoctor,
      fechaCita
    }, headerOptions);
  }
}
