import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cita } from '../models/cita.model';
import { Usuario } from '../models/usuario.model';
import { Disponibilidad } from '../models/disponibilidad.model';

const baseUrl = 'http://localhost:8080/citasMedicasBackBean-1.0-SNAPSHOT';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  constructor(private http: HttpClient) { }

  getCitasPaciente(id: any): Observable<Cita[]> {
    return this.http.get<Cita[]>(`${baseUrl}/appointment/today/${id}`);
  }

  deleteCitaPaciente(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/appointment/${id}`);
  }

  obtenerListaDoctores(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${baseUrl}/appointment/doctores`);
  }

  getDisponibilidadDoctor(idDoctor: string, fecha: string): Observable<Disponibilidad[]> {
    return this.http.get<Disponibilidad[]>(baseUrl+'/schedule/'+idDoctor+'&'+fecha+'&paciente');
  }

  saveCita(usuarioPaciente: Usuario, usuarioDoctor: Usuario, fechaCita: string): Observable<any> {
    //return this.http.post(baseUrl + '/appointment', cita);
    return this.http.post(`${baseUrl}/appointment`,{
      usuarioPaciente,
      usuarioDoctor,
      fechaCita
    });
  }
}
