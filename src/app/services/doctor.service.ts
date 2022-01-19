import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cita } from '../models/cita.model';
import { Usuario } from '../models/usuario.model';
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
export class DoctorService {

  constructor(private http: HttpClient) { }

  getCitasDoctor(idDoctor: string, fecha: string): Observable<Cita[]> {
    return this.http.get<Cita[]>(baseUrl+'/schedule?idUser='+idDoctor+'&fecha='+fecha+'&rol=doctor', headerOptions);
  }

  saveDisponibilidad(usuarioDoctor: Usuario, dia: string, horaInicio: string, horaFin: string): Observable<any> {
    return this.http.post(`${baseUrl}/schedule/new-day`,{
      usuarioDoctor,
      dia,
      horaInicio,
      horaFin
    }, headerOptions);
  }
}
