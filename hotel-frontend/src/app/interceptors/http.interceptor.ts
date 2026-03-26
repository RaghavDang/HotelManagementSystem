

// import { Injectable } from '@angular/core';
// import {
//   HttpEvent,
//   HttpHandler,
//   HttpInterceptor,
//   HttpRequest,
//   HttpErrorResponse
// } from '@angular/common/http';
// import { Observable, throwError } from 'rxjs';
// import { catchError } from 'rxjs/operators';

// @Injectable()
// export class HttpInterceptorService implements HttpInterceptor {

//   intercept(
//     req: HttpRequest<any>,
//     next: HttpHandler
//   ): Observable<HttpEvent<any>> {

//     // console.log(req);
    

//     const user = JSON.parse(localStorage.getItem('user') || '{}');

    // Clone request to add headers
    // let modifiedReq = req.clone({
    //   setHeaders: {
    //     'Content-Type': 'application/json',
    //     ...(user?._id && { 'x-user-id': user._id })
    //   }
    // });

      // console.log("Modified Request", modifiedReq);
      

//     return next.handle(modifiedReq).pipe(
//       catchError((error: HttpErrorResponse) => {
//         console.error('API Error:', error);

//         if (error.status === 0) {
//           alert('Server is unreachable');
//         } else if (error.status === 401) {
//           alert('Unauthorized request');
//         } else if (error.status === 500) {
//           alert('Internal server error');
//         }

//         return throwError(() => error);
//       })
//     );
//   }
// }

import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler
} from '@angular/common/http';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const token = localStorage.getItem('token');

    if (token) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    return next.handle(req);
  }
}
