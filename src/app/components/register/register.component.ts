import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service'; 

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: any = {
    nombre: null,
    apellido: null,
    username: null,
    password: null,
    rol: 'paciente'
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    const { nombre, apellido, username, password, rol } = this.form;
    this.authService.register(nombre, apellido, username, password, rol).subscribe({
      next: data => {
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        console.log(data);
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
        console.log(err);
      }
    });
  }

}
