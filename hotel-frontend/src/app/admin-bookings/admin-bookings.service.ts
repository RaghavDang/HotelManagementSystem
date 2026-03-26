// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class AdminBookingsService {

//   constructor() { }
// }

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../environments/environment.it';

@Injectable({
  providedIn: 'root'
})


export class AdminBookingsService {

  // constructor(private http: HttpClient){}
    
  
  // getAllBookings():Observable<any>{
  //   return this.http.get(``);
  // }
  
 private readonly baseUrl = environment.bookingsUrl ;

  constructor(private http: HttpClient) {}

  getAllBookings(): Observable<any> {
    return this.http.get(`${this.baseUrl}/all`).pipe(
      map(res => res ?? [])
    );
  }

}