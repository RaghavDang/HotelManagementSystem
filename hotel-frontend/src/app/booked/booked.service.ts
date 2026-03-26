
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.it';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookedService {

  bookingsUrl=environment.bookingsUrl

  constructor(private http: HttpClient) {}

  //Taking the userId and then displaying only the booking for that particular usedId
  getBookings(userId: string) : Observable<any>  {
    try{

      return this.http.get(this.bookingsUrl, { params: { userId } });
    }
     catch(err){
          console.log(err);
          return throwError(()=>`Failed to get the bookings!!`);
     }
  }


  //Used when we cancel the booking from the booking page
  cancel(id: string): Observable<any>  {
    try{
      return this.http.delete(this.bookingsUrl+`/${id}`);
    }
     catch(err){
      console.log(err);
      return throwError(()=>`Failed to change the booking status!!`);
    }
  }
}


