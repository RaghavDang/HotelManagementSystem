// import { ComponentFixture, TestBed } from '@angular/core/testing';

// import { HomeComponent } from './home.component';

// describe('HomeComponent', () => {
//   let component: HomeComponent;
//   let fixture: ComponentFixture<HomeComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       declarations: [HomeComponent]
//     })
//     .compileComponents();
    
//     fixture = TestBed.createComponent(HomeComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { HomeService } from './home.service';
import { BookedService } from '../booked/booked.service';
import { of } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let homeServiceSpy: jasmine.SpyObj<HomeService>;
  let bookedServiceSpy: jasmine.SpyObj<BookedService>;

  beforeEach(async () => {
    homeServiceSpy = jasmine.createSpyObj('HomeService', ['getHotels']);
    bookedServiceSpy = jasmine.createSpyObj('BookedService', ['cancel']);

    // Mock localStorage before component creation
    spyOn(localStorage, 'getItem').and.returnValue(
      JSON.stringify({
        preferences: {
          defaultLocation: 'Pune',
          defaultAmount: 5000
        }
      })
    );

    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
      providers: [
        { provide: HomeService, useValue: homeServiceSpy },
        { provide: BookedService, useValue: bookedServiceSpy }
      ],
      schemas: [NO_ERRORS_SCHEMA] // ignore child components
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;

    // Mock services
    homeServiceSpy.getHotels.and.returnValue(
      of([
        { id: 1, name: 'Hotel A', location: 'Pune' },
        { id: 2, name: 'Hotel B', location: 'Mumbai' },
        { id: 3, name: 'Hotel C', location: 'Pune' }
      ])
    );

    bookedServiceSpy.cancel.and.returnValue(of({}));

    spyOn(window, 'alert');

    fixture.detectChanges(); // triggers ngOnInit
  });

  // --------------------------------
  // COMPONENT CREATION
  // --------------------------------
  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  // --------------------------------
  // CONSTRUCTOR DEFAULTS
  // --------------------------------
  it('should set defaults from localStorage', () => {
    expect(component.selectedLocation).toBe('Pune');
    expect(component.maxPrice).toBe('5000');
    expect(component.minPrice).toBe('0');
  });

  // --------------------------------
  // LOAD HOTELS ON INIT
  // --------------------------------
  it('should load hotels on init and extract locations', () => {
    expect(homeServiceSpy.getHotels).toHaveBeenCalled();

    expect(component.hotels.length).toBe(3);
    expect(component.locations).toEqual(['Pune', 'Mumbai']);
  });

  // --------------------------------
  // OPEN HOTEL DETAILS
  // --------------------------------
  it('should set selectedHotel when openDetails is called', () => {
    const hotel = { id: 1 };

    component.openDetails(hotel);

    expect(component.selectedHotel).toEqual(hotel);
  });

  // --------------------------------
  // OPEN BOOKING
  // --------------------------------
  it('should open booking modal and close details', () => {
    const hotel = { id: 2 };

    component.openBooking(hotel);

    expect(component.selectedHotelForBooking).toEqual(hotel);
    expect(component.selectedHotel).toBeNull();
  });

  // --------------------------------
  // CLOSE BOOKING MODAL
  // --------------------------------
  it('should close booking modal', () => {
    component.selectedHotelForBooking = { id: 1 };

    component.closeBookingModal();

    expect(component.selectedHotelForBooking).toBeNull();
  });

  // --------------------------------
  // OPEN RESCHEDULE
  // --------------------------------
  it('should open reschedule and close details', () => {
    const booking = { id: 'b1' };

    component.openReschedule(booking);

    expect(component.selectedBooking).toEqual(booking);
    expect(component.selectedHotel).toBeNull();
  });

  // --------------------------------
  // CANCEL BOOKING
  // --------------------------------
  it('should cancel booking, show alert and reload hotels', () => {
    spyOn(component, 'loadHotels');

    component.cancelBooking('booking123');

    expect(bookedServiceSpy.cancel).toHaveBeenCalledWith('booking123');
    expect(window.alert).toHaveBeenCalledWith('Booking cancelled');
    expect(component.selectedHotel).toBeNull();
    expect(component.loadHotels).toHaveBeenCalled();
  });
});
