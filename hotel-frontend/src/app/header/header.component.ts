import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {
 
  constructor(private router: Router) {}

  
  get loggedIn() {
    return !!localStorage.getItem('user');
  }

  get isAdmin(): boolean {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user).role === 'admin' : false;
  }

  get isUser(): boolean {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user).role === 'user' : false;
  }


  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}

