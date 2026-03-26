import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment.it';

@Injectable({
  providedIn: 'root'
})
export class BookingModalService {

  bookingsUrl=environment.bookingsUrl
  rescheduleBookingUrl=environment.rescheduleBookingUrl

  constructor(private http:HttpClient) { }

  bookingHotel(body: any) : Observable<any> {
    try{
      return  this.http.post(this.bookingsUrl, body)
    }
     catch(err){
          console.log(err);
          return throwError(()=>`Failed to book the Hotel!!`);
     }
  }

  rescheduleBooking(bId: any, body: any): Observable<any> {
    try{
      return this.http.put(this.rescheduleBookingUrl+`/${bId}`, body)
    }
     catch(err){
      console.log(err);
      return throwError(()=>`Failed to reschedule the Booking!!`);
    }
  }
}
