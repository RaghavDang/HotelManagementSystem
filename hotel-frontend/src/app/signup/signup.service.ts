// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';

// @Injectable({
//   providedIn: 'root'
// })
// export class SignupService {

//   private base = 'http://localhost:5000/api/auth';

//   constructor(private http: HttpClient) {}

//   register(data: any) {
//     return this.http.post(this.base + '/register', data);
//   }
// } 


import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.it';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  private signupUrl =environment.signupUrl;

  constructor(private http: HttpClient) {}

  register(data: any): Observable<any> {
    try{
      return this.http.post(this.signupUrl, data);
    }
    catch(err){
      console.log(`Signup service error`,err);
      return throwError(()=>`Signup failed!! Please register again`);
    }
  }
}
