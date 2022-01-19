import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isLoggedIn : any = false;
  username : string = "";
  rolUsuario : string = "";

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.isLoggedIn = localStorage.getItem('isLoggedIn')!;
    this.rolUsuario = localStorage.getItem('rol')!;
    if (this.isLoggedIn == true) {
      this.username = localStorage.getItem('username')!;
    }
  }

  logout(): void {
    localStorage.clear();
    window.location.reload();
    this.router.navigateByUrl('login');
  }
}
