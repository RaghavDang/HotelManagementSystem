// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class AdminHotelsService {

//   constructor() { }
// }

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.it';

@Injectable({
  providedIn: 'root'
})
export class AdminHotelsService {

 
 private readonly baseUrl =environment.hotelUrl;

 
  constructor(private http: HttpClient) {}

  addHotel(data: any) :Observable<any>{
    return this.http.post(`${this.baseUrl}/add/`, data);
  }


}