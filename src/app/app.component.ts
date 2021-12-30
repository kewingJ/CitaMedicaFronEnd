import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isLoggedIn? : string = "";
  username? : string;


  constructor(private router: Router) { }

  ngOnInit(): void {
    this.isLoggedIn = localStorage.getItem('isLoggedIn')!;

    if (this.isLoggedIn == "si") {
      this.username = localStorage.getItem('username')!;
    }
  }

  logout(): void {
    localStorage.clear();
    this.router.navigateByUrl('login');
  }
}
