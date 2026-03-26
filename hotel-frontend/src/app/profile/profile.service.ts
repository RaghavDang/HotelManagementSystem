import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.it';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  changePasswordUrl=environment.changePasswordUrl
  editPreferencesUrl=environment.EditPreferencesUrl

  constructor(private http: HttpClient) {}

  
  updateProfile(id: string, data: any) : Observable<any>  {
    console.log(data);
    try{
      return this.http.post(this.editPreferencesUrl+`/${id}`, data);
    }
    catch(err){
      console.log(err);
      return throwError(()=>`Failed to update preferences!!`);
    }
  }

  changePassword(id: string, data: any): Observable<any>  {
    try{

      return this.http.post(this.changePasswordUrl+`/${id}`, data);
    }
    catch(err){
      console.log(err);
      return throwError(()=>`Failed to update the password!!`);
    }
  }
}
