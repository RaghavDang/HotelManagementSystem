
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.it';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookmarkService {

  bookmarksUrl=environment.bookmarksUrl

  constructor(private http: HttpClient) {}

  getBookmarks(userId: string) : Observable<any> {
    try{
      return this.http.get(this.bookmarksUrl, { params: { userId } });
    }
    catch(err){
      console.log(err);
      return throwError(()=>`Failed to get the bookmarks!!`);
    }
  }

  remove(id: string): Observable<any>  {
    try{
      return this.http.delete(this.bookmarksUrl+`/${id}`);
    }
    catch(err){
      console.log(err);
      return throwError(()=>`Failed to remove the bookmarks!!`);
    }
  }

  bookmarkHotel(body: any): Observable<any> {
    try{
      return this.http.post(this.bookmarksUrl+"/add", body)
    }
     catch(err){
      console.log(err);
      return throwError(()=>`Failed to bookmark the Hotel!!`);
    }
  }



}


