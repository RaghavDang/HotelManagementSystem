import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment.it';

@Injectable({ providedIn: 'root' })
export class ReportService {

  reportUrl=environment.reportUrl
  locationsUrl=environment.locationsUrl

  constructor(private http: HttpClient) {}


  getReport(params: any) {
    let query = new HttpParams()
      .set('userId', params.userId);

    if (params.location) query = query.set('location', params.location);
    if (params.month) query = query.set('month', params.month);
    if (params.year) query = query.set('year', params.year);

    console.log(query);
    
    //This URL is working fine
    return this.http.get(this.reportUrl, { params: query });
  }

  //Correctly working
  getLocations() {
    return this.http.get(this.locationsUrl);
  }
}
