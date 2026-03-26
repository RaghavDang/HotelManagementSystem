// import { TestBed } from '@angular/core/testing';

// import { BookedService } from './booked.service';

// describe('BookedService', () => {
//   let service: BookedService;

//   beforeEach(() => {
//     TestBed.configureTestingModule({});
//     service = TestBed.inject(BookedService);
//   });

//   it('should be created', () => {
//     expect(service).toBeTruthy();
//   });
// });

import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { BookedService } from './booked.service';
import { environment } from '../../environments/environment.it';

describe('BookedService', () => {
  let service: BookedService;
  let httpMock: HttpTestingController;
  const bookingsUrl = environment.bookingsUrl;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BookedService]
    });

    service = TestBed.inject(BookedService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  // -------------------------------
  // SERVICE CREATION
  // -------------------------------
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // -------------------------------
  // GET BOOKINGS BY USER ID
  // -------------------------------
  it('should fetch bookings for a given userId', () => {
    const userId = 'user123';
    const mockResponse = [
      { id: '1', hotel: 'Taj', userId },
      { id: '2', hotel: 'Oberoi', userId }
    ];

    service.getBookings(userId).subscribe((res) => {
      expect(res).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(
      `${bookingsUrl}?userId=${userId}`
    );

    expect(req.request.method).toBe('GET');

    req.flush(mockResponse);
  });

  // -------------------------------
  // CANCEL BOOKING
  // -------------------------------
  it('should cancel a booking by id', () => {
    const bookingId = 'booking123';

    service.cancel(bookingId).subscribe((res) => {
      expect(res).toBeTruthy();
    });

    const req = httpMock.expectOne(
      `${bookingsUrl}/${bookingId}`
    );

    expect(req.request.method).toBe('DELETE');

    req.flush({ success: true });
  });

  // -------------------------------
  // HTTP ERROR HANDLING (GET)
  // -------------------------------
  it('should handle error while fetching bookings', () => {
    const userId = 'user123';

    service.getBookings(userId).subscribe({
      next: () => fail('Should have failed'),
      error: (err) => {
        expect(err).toBeTruthy();
      }
    });

    const req = httpMock.expectOne(
      `${bookingsUrl}?userId=${userId}`
    );

    req.error(new ProgressEvent('Network error'));
  });


  // HTTP ERROR HANDLING (DELETE)
  it('should handle error while cancelling booking', () => {
    const bookingId = 'booking123';

    service.cancel(bookingId).subscribe({
      next: () => fail('Should have failed'),
      error: (err) => {
        expect(err).toBeTruthy();
      }
    });

    const req = httpMock.expectOne(
      `${bookingsUrl}/${bookingId}`
    );

    req.error(new ProgressEvent('Network error'));
  });


  // VERIFY NO PENDING REQUESTS

  afterEach(() => {
    httpMock.verify();
  });
});
