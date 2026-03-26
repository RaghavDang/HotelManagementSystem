// import { TestBed } from '@angular/core/testing';

// import { CancelledService } from './cancelled.service';

// describe('CancelledService', () => {
//   let service: CancelledService;

//   beforeEach(() => {
//     TestBed.configureTestingModule({});
//     service = TestBed.inject(CancelledService);
//   });

//   it('should be created', () => {
//     expect(service).toBeTruthy();
//   });
// });

import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CancelledService } from './cancelled.service';
import { environment } from '../../environments/environment.it';

describe('CancelledService', () => {
  let service: CancelledService;
  let httpMock: HttpTestingController;
  const bookingsUrl = environment.bookingsUrl;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CancelledService]
    });

    service = TestBed.inject(CancelledService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  // -------------------------
  // SERVICE CREATION
  // -------------------------
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // -------------------------
  // GET CANCELLED BOOKINGS
  // -------------------------
  it('should fetch bookings for a given userId', () => {
    const userId = 'user123';
    const mockResponse = [
      { id: '1', status: 'cancelled' },
      { id: '2', status: 'booked' }
    ];

    service.getCancelled(userId).subscribe((res) => {
      expect(res).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(
      `${bookingsUrl}?userId=${userId}`
    );

    expect(req.request.method).toBe('GET');

    req.flush(mockResponse);
  });

  // -------------------------
  // HTTP ERROR HANDLING
  // -------------------------
  it('should handle error when fetching cancelled bookings fails', () => {
    const userId = 'user123';

    service.getCancelled(userId).subscribe({
      next: () => fail('Expected error, but got success'),
      error: (err) => {
        expect(err).toBeTruthy();
      }
    });

    const req = httpMock.expectOne(
      `${bookingsUrl}?userId=${userId}`
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
