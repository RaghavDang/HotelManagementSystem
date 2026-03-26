
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SignupService } from './signup.service';
import { ReportService } from '../report/report.service';

@Component({
  templateUrl: './signup.component.html'
})
export class SignupComponent {

  name = '';
  email = '';
  password = '';
  defaultLocation = '';
  defaultAmount: any = '';

  locations =[] ;
  
  constructor(private signup: SignupService, private router: Router, private reportService:ReportService) {}

  ngOnInit(){
    this.loadLocations();
  }

   loadLocations() {
    this.reportService.getLocations().subscribe((res: any) => {
      this.locations = res.locations || [];
    });
  }


  submit() {

    // -----------------------
    // EMAIL VALIDATION
    // -----------------------
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|in)$/;

    if (!emailPattern.test(this.email)) {
      alert("Enter a valid email ending with .com or .in");
      return;
    }

    // -----------------------
    // PASSWORD VALIDATION
    // - 1 uppercase letter
    // - 1 digit
    // - min length 6
    // -----------------------
    const passwordPattern = /^(?=.*[A-Z])(?=.*\d).{6,}$/;

    if (!passwordPattern.test(this.password)) {
      alert("Password must be at least 6 characters, contain 1 uppercase letter & 1 digit.");
      return;
    }

    // -----------------------
    // DEFAULT AMOUNT VALIDATION (no negative / empty)
    // -----------------------
    if (this.defaultAmount === '' || this.defaultAmount === null) {
      alert("Default amount is required.");
      return;
    }

    if (Number(this.defaultAmount) < 0) {
      alert("Default amount cannot be negative.");
      return;
    }

    // -----------------------
    // API BODY
    // -----------------------
    const body = {
      name: this.name,
      email: this.email,
      password: this.password,
      preferences: {
        defaultAmount: Number(this.defaultAmount),
        defaultLocation: this.defaultLocation
      }
    };

  
    // API CALL
   
    this.signup.register(body).subscribe((res: any) => {

      if (res.success) {
        alert('Registration successful. Please login.');
        this.router.navigate(['/login']);
      } else {
        alert(res.msg || 'Email already exists');
      }

    });
  }
}
