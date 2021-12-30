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
  isLoggedIn = "";
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    const { username, password } = this.form;

    this.authService.login(username, password).subscribe({
      next: data => {
        if(data != null) {
          this.isLoginFailed = false;
          this.isLoggedIn = "si";
          localStorage.setItem('isLoggedIn', 'si');
          localStorage.setItem('idUsuario', data['idUsuario']);
          localStorage.setItem('username', data['username']);
          localStorage.setItem('rol', data['rol']);
          console.log(data);
          this.router.navigateByUrl('/home');
        } else {
          this.isLoginFailed = true;
          this.isLoggedIn = "";
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

  reloadPage(): void {
    window.location.reload();
  }
}
