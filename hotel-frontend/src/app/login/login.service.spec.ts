

import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { LoginService } from './login.service';

describe('LoginService', () => {
  let service: LoginService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [LoginService]
    });

    service = TestBed.inject(LoginService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should call login API', () => {
    service.login({ email: 'test@gmail.com', password: 'Test123' })
      .subscribe();

    const req = httpMock.expectOne('http://localhost:5000/api/auth/login');
    expect(req.request.method).toBe('POST');

    req.flush({ success: true });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
