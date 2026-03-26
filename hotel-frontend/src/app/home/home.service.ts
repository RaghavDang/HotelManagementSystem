import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment.it';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  hotelUrl= environment.hotelUrl

  constructor(private http: HttpClient) {}

  getHotels(filter: any = {}) : Observable<any>  {
    let params = new HttpParams();

    Object.keys(filter).forEach(key => {
      if (filter[key] !== '') {
        params = params.set(key, filter[key]);    //key:Location, filter[key]:Pune
      }
    });
    
    // try{

    //   return this.http.get(this.hotelUrl, { params });
    // }
    // catch(err){
    //   console.log(err);    
    //   return throwError(()=>`Failed to fetch the hotels!!`);
    // }
     return this.http.get(this.hotelUrl, { params }).pipe(
    catchError(() => throwError(() => 'Failed to fetch the hotels!!'))
  );
  }
}

