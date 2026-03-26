// import { TestBed } from '@angular/core/testing';

// import { BookingModalService } from './booking-modal.service';

// describe('BookingModalService', () => {
//   let service: BookingModalService;

//   beforeEach(() => {
//     TestBed.configureTestingModule({});
//     service = TestBed.inject(BookingModalService);
//   });

//   it('should be created', () => {
//     expect(service).toBeTruthy();
//   });
// });

import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { BookingModalService } from './booking-modal.service';
import { environment } from '../../environments/environment.it';

describe('BookingModalService', () => {
  let service: BookingModalService;
  let httpMock: HttpTestingController;

  const bookingsUrl = environment.bookingsUrl;
  const rescheduleBookingUrl = environment.rescheduleBookingUrl;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BookingModalService]
    });

    service = TestBed.inject(BookingModalService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  // -------------------------
  // SERVICE CREATION
  // -------------------------
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // -------------------------
  // BOOK HOTEL
  // -------------------------
  it('should book a hotel', () => {
    const body = {
      userId: 'user123',
      hotelId: 'hotel456',
      fromDate: '2025-02-10',
      toDate: '2025-02-12'
    };

    const mockResponse = { success: true };

    service.bookingHotel(body).subscribe((res) => {
      expect(res).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(bookingsUrl);

    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(body);

    req.flush(mockResponse);
  });

  // -------------------------
  // RESCHEDULE BOOKING
  // -------------------------
  it('should reschedule a booking', () => {
    const bookingId = 'booking123';
    const body = {
      fromDate: '2025-03-01',
      toDate: '2025-03-05'
    };

    const mockResponse = { success: true };

    service.rescheduleBooking(bookingId, body).subscribe((res) => {
      expect(res).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(
      `${rescheduleBookingUrl}/${bookingId}`
    );

    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(body);

    req.flush(mockResponse);
  });

  // -------------------------
  // ERROR HANDLING - BOOK HOTEL
  // -------------------------
  it('should handle error while booking hotel', () => {
    service.bookingHotel({}).subscribe({
      next: () => fail('Expected error, but got success'),
      error: (err) => {
        expect(err).toBeTruthy();
      }
    });

    const req = httpMock.expectOne(bookingsUrl);

    req.error(new ProgressEvent('Network error'));
  });

  // -------------------------
  // ERROR HANDLING - RESCHEDULE BOOKING
  // -------------------------
  it('should handle error while rescheduling booking', () => {
    service.rescheduleBooking('booking123', {}).subscribe({
      next: () => fail('Expected error, but got success'),
      error: (err) => {
        expect(err).toBeTruthy();
      }
    });

    const req = httpMock.expectOne(
      `${rescheduleBookingUrl}/booking123`
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
