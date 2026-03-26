// import { TestBed } from '@angular/core/testing';

// import { SignupService } from './signup.service';

// describe('SignupService', () => {
//   let service: SignupService;

//   beforeEach(() => {
//     TestBed.configureTestingModule({});
//     service = TestBed.inject(SignupService);
//   });

//   it('should be created', () => {
//     expect(service).toBeTruthy();
//   });
// });

import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SignupService } from './signup.service';
import { environment } from '../../environments/environment.it';

describe('SignupService', () => {
  let service: SignupService;
  let httpMock: HttpTestingController;
  const signupUrl = environment.signupUrl;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SignupService]
    });

    service = TestBed.inject(SignupService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  // -------------------------
  // SERVICE CREATION
  // -------------------------
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // -------------------------
  // REGISTER USER (POST)
  // -------------------------
  it('should call signup API to register user', () => {
    const mockBody = {
      name: 'Raghav',
      email: 'test@gmail.com',
      password: 'Test123',
      preferences: {
        defaultAmount: 500,
        defaultLocation: 'Pune'
      }
    };

    const mockResponse = { success: true };

    service.register(mockBody).subscribe((res) => {
      expect(res).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(signupUrl);

    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockBody);

    req.flush(mockResponse);
  });

  // -------------------------
  // HANDLE HTTP ERROR
  // -------------------------
  it('should handle error when signup API fails', () => {
    const mockBody = {
      name: 'Raghav',
      email: 'test@gmail.com',
      password: 'Test123'
    };

    service.register(mockBody).subscribe({
      next: () => fail('Expected error, but got success'),
      error: (err) => {
        expect(err).toBeTruthy();
      }
    });

    const req = httpMock.expectOne(signupUrl);

    req.error(new ProgressEvent('Network error'));
  });

  // -------------------------
  // VERIFY NO PENDING REQUESTS
  // -------------------------
  afterEach(() => {
    httpMock.verify();
  });
});
