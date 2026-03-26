// import { TestBed } from '@angular/core/testing';

// import { ProfileService } from './profile.service';

// describe('ProfileService', () => {
//   let service: ProfileService;

//   beforeEach(() => {
//     TestBed.configureTestingModule({});
//     service = TestBed.inject(ProfileService);
//   });

//   it('should be created', () => {
//     expect(service).toBeTruthy();
//   });
// });

import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProfileService } from './profile.service';
import { environment } from '../../environments/environment.it';

describe('ProfileService', () => {
  let service: ProfileService;
  let httpMock: HttpTestingController;

  const changePasswordUrl = environment.changePasswordUrl;
  const editPreferencesUrl = environment.EditPreferencesUrl;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProfileService]
    });

    service = TestBed.inject(ProfileService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  // -------------------------
  // SERVICE CREATION
  // -------------------------
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // -------------------------
  // UPDATE PROFILE (PREFERENCES)
  // -------------------------
  it('should update user profile preferences', () => {
    const userId = 'user123';
    const mockBody = {
      defaultAmount: 500,
      defaultLocation: 'Pune'
    };

    const mockResponse = { success: true };

    service.updateProfile(userId, mockBody).subscribe((res) => {
      expect(res).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(
      `${editPreferencesUrl}/${userId}`
    );

    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockBody);

    req.flush(mockResponse);
  });

  // -------------------------
  // CHANGE PASSWORD
  // -------------------------
  it('should change user password', () => {
    const userId = 'user123';
    const mockBody = {
      oldPassword: 'Old123',
      newPassword: 'New123'
    };

    const mockResponse = { success: true };

    service.changePassword(userId, mockBody).subscribe((res) => {
      expect(res).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(
      `${changePasswordUrl}/${userId}`
    );

    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockBody);

    req.flush(mockResponse);
  });

  // -------------------------
  // ERROR HANDLING - UPDATE PROFILE
  // -------------------------
  it('should handle error while updating profile', () => {
    service.updateProfile('user123', {}).subscribe({
      next: () => fail('Expected error, but got success'),
      error: (err) => {
        expect(err).toBeTruthy();
      }
    });

    const req = httpMock.expectOne(
      `${editPreferencesUrl}/user123`
    );

    req.error(new ProgressEvent('Network error'));
  });

  // -------------------------
  // ERROR HANDLING - CHANGE PASSWORD
  // -------------------------
  it('should handle error while changing password', () => {
    service.changePassword('user123', {}).subscribe({
      next: () => fail('Expected error, but got success'),
      error: (err) => {
        expect(err).toBeTruthy();
      }
    });

    const req = httpMock.expectOne(
      `${changePasswordUrl}/user123`
    );

    req.error(new ProgressEvent('Network error'));
  });

  // -------------------------
  // VERIFY NO PENDING REQUESTS
  // -------------------------
  afterEach(() => {
    httpMock.verify();
  });
});
