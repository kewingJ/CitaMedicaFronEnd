import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service'; 
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: any = {
    username: null,
    password: null
  };
  isLoggedIn = false;
  rolUsuario = "";
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    if (localStorage.getItem('isLoggedIn')) {
      this.isLoggedIn = true;
      this.rolUsuario = localStorage.getItem('rol')!;
    }
  }

  onSubmit(): void {
    const { username, password } = this.form;

    this.authService.login(username, password).subscribe({
      next: data => {
        if(data != null) {
          this.isLoginFailed = false;
          this.isLoggedIn = true;
          localStorage.setItem('isLoggedIn', 'true');
          localStorage.setItem('idUsuario', data['idUsuario']);
          localStorage.setItem('username', data['username']);
          localStorage.setItem('password', data['password']);
          localStorage.setItem('rol', data['rol']);
          this.rolUsuario = localStorage.getItem('rol')!;
          console.log(data);
          if(data['rol'] == 'paciente'){
            this.reloadPage();
          } else {
            this.reloadPage();
          }
        } else {
          this.isLoginFailed = true;
          this.isLoggedIn = false;
          console.log(data);
          this.errorMessage = 'Usuario o Contraseña son incorrectos';
        }
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    });
  }

  homePaciente(): void {
    this.router.navigateByUrl('home');
  }

  homeDoctor(): void {
    this.router.navigateByUrl('doctor');
  }

  reloadPage(): void {
    window.location.reload();
  }
}
