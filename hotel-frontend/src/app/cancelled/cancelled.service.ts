
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.it';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CancelledService {
  bookingsUrl=environment.bookingsUrl

  constructor(private http: HttpClient) {}


  //Getting all the booking for the particular usedId
  getCancelled(userId: string) : Observable<any> {
    try{

      return this.http.get(this.bookingsUrl, { params: { userId } });
    }
    catch(err){
      console.log(err);
       return throwError(()=>`Failed to fetch the bookings!!`);
    }
  }
}
