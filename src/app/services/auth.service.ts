import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrl = 'http://localhost:8080/citasMedicasBackBean-1.0-SNAPSHOT/auth';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post(baseUrl + '/login', {
      username,
      password
    });
  }

  register(nombre: string, apellido: string, username: string, password: string, rol: string): Observable<any> {
    return this.http.post(baseUrl + '/signup', {
      nombre,
      apellido,
      username,
      password,
      rol
    });
  }
}
