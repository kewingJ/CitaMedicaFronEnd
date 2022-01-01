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
export class DoctorService {

  constructor(private http: HttpClient) { }

  getCitasDoctor(idDoctor: string, fecha: string): Observable<Cita[]> {
    return this.http.get<Cita[]>(baseUrl+'/schedule/'+idDoctor+'&'+fecha+'&doctor');
  }

  saveDisponibilidad(usuarioDoctor: Usuario, dia: string, horaInicio: string, horaFin: string): Observable<any> {
    return this.http.post(`${baseUrl}/schedule/new-day`,{
      usuarioDoctor,
      dia,
      horaInicio,
      horaFin
    });
  }
}
