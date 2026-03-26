

// import { TestBed } from '@angular/core/testing';
// import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
// import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
// import { HttpInterceptorService } from './http.interceptor';

// describe('HttpInterceptorService', () => {
//   let http: HttpClient;
//   let httpMock: HttpTestingController;

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       imports: [HttpClientTestingModule],
//       providers: [
//         {
//           provide: HTTP_INTERCEPTORS,
//           useClass: HttpInterceptorService,
//           multi: true
//         }
//       ]
//     });

//     http = TestBed.inject(HttpClient);
//     httpMock = TestBed.inject(HttpTestingController);
//   });

//   it('should intercept HTTP request', () => {
//     http.get('/test').subscribe();

//     const req = httpMock.expectOne('/test');
//     expect(req.request).toBeTruthy();

//     req.flush({});
//   });

//   afterEach(() => {
//     httpMock.verify();
//   });
// });
