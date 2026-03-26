import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.it';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  loginUrl = environment.loginUrl;

  constructor(private http: HttpClient) {}

  login(data: any): Observable<any>  {
    try{
      return this.http.post(this.loginUrl, data);
    }
    catch(err){
      console.log(`Login service error`,err);
      return throwError(()=>`Login failed!! Please try again`);
    }
  }
}
