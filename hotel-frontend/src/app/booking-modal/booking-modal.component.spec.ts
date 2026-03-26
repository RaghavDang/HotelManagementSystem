// import { ComponentFixture, TestBed } from '@angular/core/testing';

// import { BookingModalComponent } from './booking-modal.component';

// describe('BookingModalComponent', () => {
//   let component: BookingModalComponent;
//   let fixture: ComponentFixture<BookingModalComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       declarations: [BookingModalComponent]
//     })
//     .compileComponents();
    
//     fixture = TestBed.createComponent(BookingModalComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookingModalComponent } from './booking-modal.component';
import { BookingModalService } from './booking-modal.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('BookingModalComponent', () => {
  let component: BookingModalComponent;
  let fixture: ComponentFixture<BookingModalComponent>;
  let bookingServiceSpy: jasmine.SpyObj<BookingModalService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    bookingServiceSpy = jasmine.createSpyObj('BookingModalService', [
      'bookingHotel',
      'rescheduleBooking'
    ]);

    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    // Mock localStorage
    spyOn(localStorage, 'getItem').and.returnValue(
      JSON.stringify({ _id: 'user123' })
    );

    await TestBed.configureTestingModule({
      declarations: [BookingModalComponent],
      imports: [HttpClientTestingModule],
      providers: [
        { provide: BookingModalService, useValue: bookingServiceSpy },
        { provide: Router, useValue: routerSpy }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(BookingModalComponent);
    component = fixture.componentInstance;

    spyOn(window, 'alert');

    component.hotel = { _id: 'hotel123' };

    fixture.detectChanges();
  });

  // -------------------------
  // COMPONENT CREATION
  // -------------------------
  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  // -------------------------
  // DATE VALIDATION
  // -------------------------
  it('should return false if from date is before today', () => {
    component.fromDate = '2000-01-01';
    component.toDate = '2000-01-02';

    expect(component.isDateValid()).toBeFalse();
    expect(window.alert).toHaveBeenCalled();
  });

  // -------------------------
  // NEW BOOKING FLOW
  // -------------------------
  it('should book hotel successfully', () => {
    bookingServiceSpy.bookingHotel.and.returnValue(of({}));

    component.fromDate = '2099-01-01';
    component.toDate = '2099-01-02';

    spyOn(component.booked, 'emit');
    spyOn(component.close, 'emit');

    component.submit();

    expect(bookingServiceSpy.bookingHotel).toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalledWith('Booking successful');
    expect(component.booked.emit).toHaveBeenCalled();
    expect(component.close.emit).toHaveBeenCalled();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/booked']);
  });

  // -------------------------
  // RESCHEDULE BOOKING FLOW
  // -------------------------
  it('should reschedule booking successfully', () => {
    bookingServiceSpy.rescheduleBooking.and.returnValue(
      of({ success: true })
    );

    component.booking = { _id: 'booking123' };
    component.fromDate = '2099-02-01';
    component.toDate = '2099-02-02';

    spyOn(component.updated, 'emit');
    spyOn(component.close, 'emit');

    component.submit();

    expect(bookingServiceSpy.rescheduleBooking).toHaveBeenCalledWith(
      'booking123',
      jasmine.any(Object)
    );
    expect(window.alert).toHaveBeenCalledWith(
      'Booking rescheduled successfully!'
    );
    expect(component.updated.emit).toHaveBeenCalled();
    expect(component.close.emit).toHaveBeenCalled();
  });

  // -------------------------
  // REBOOK CANCELLED BOOKING
  // -------------------------
  it('should rebook cancelled booking', () => {
    bookingServiceSpy.rescheduleBooking.and.returnValue(
      of({ success: true })
    );

    component.cbook = { _id: 'cancelled123' };
    component.fromDate = '2099-03-01';
    component.toDate = '2099-03-02';

    spyOn(component.updated, 'emit');
    spyOn(component.close, 'emit');

    component.submit();

    expect(bookingServiceSpy.rescheduleBooking).toHaveBeenCalledWith(
      'cancelled123',
      jasmine.any(Object)
    );
    expect(component.updated.emit).toHaveBeenCalled();
    expect(component.close.emit).toHaveBeenCalled();
  });

  // -------------------------
  // MISSING DATES VALIDATION
  // -------------------------
  it('should show alert if dates are missing', () => {
    component.fromDate = '';
    component.toDate = '';

    component.submit();

    expect(window.alert).toHaveBeenCalledWith(
      'Please select From and To dates'
    );
  });
});
