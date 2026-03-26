
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { Store } from '@ngrx/store';
import { loginSuccess } from '../store/auth/auth.actions';

@Component({
  templateUrl: './login.component.html'
})
export class LoginComponent {

  email = '';
  password = '';

  constructor(private loginService: LoginService, private router: Router, private store: Store) {}

 

  submit() {

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|in)$/;

    if (!emailPattern.test(this.email)) {
      alert("Enter a valid email ending with .com or .in");
      return;
    }
 
    const passwordPattern = /^(?=.*[A-Z])(?=.*\d).{6,}$/;

    if (!passwordPattern.test(this.password)) {
      alert("Password must be minimum 6 characters long, contain at least 1 uppercase letter and 1 digit.");
      return;
    }

  this.loginService.login({ email: this.email, password: this.password })
  .subscribe({
    next: (res: any) => {
      if (res.success) {
        // this.store.dispatch(loginSuccess({ user: res.user }));
        localStorage.setItem('token', res.token);
        localStorage.setItem('user', JSON.stringify(res.user));
        this.router.navigate(['/home']);
      } else {
        alert(res.msg || 'Invalid credentials');
      }
    },
    error: (err) => {
      console.error(err.message);
      alert(err.message)
      alert('Login failed. Please try again later.');
    }
  });

  }
}


