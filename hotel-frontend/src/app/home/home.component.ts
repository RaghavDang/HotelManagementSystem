import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';
import { BookedService } from '../booked/booked.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  hotels: any[] = [];
  locations: string[] = [];
  selectedBooking: any = null;
  selectedLocation = '';
  searchText = '';
  minPrice = '';
  maxPrice = '';

  selectedHotel: any = null;
  selectedHotelForBooking: any = null;
  currentYear = new Date().getFullYear();

  constructor(private homeService: HomeService, private bookedService: BookedService) {
        //Newly Added
       const userstr=localStorage.getItem('user');
        if(userstr){
          const user=JSON.parse(userstr);
          this.selectedLocation=user?.preferences?.defaultLocation || '';
          this.maxPrice=user?.preferences?.defaultAmount || '';
          this.minPrice='0'
        }
  }

  ngOnInit() {
    this.loadHotels();
  }

  loadHotels() {
    this.homeService.getHotels({
      location: this.selectedLocation,
      search: this.searchText,
      min: this.minPrice,
      max: this.maxPrice
    }).subscribe((res: any) => {
      this.hotels = res;

      this.locations = [...new Set(this.hotels.map((h: any) => h.location))];
    });
  }

    // Getting hotel from the hotel-card component to open in the hotel-details view
    openDetails(hotel: any) {
      this.selectedHotel = hotel;
    }

    // This will work when the book button is clicked from the hotel-details Component
    openBooking(hotel: any) {
    this.selectedHotelForBooking = hotel;
    this.selectedHotel=null
    }

    // openBookingModal(hotel: any) {
    // this.selectedHotelForBooking = hotel;
    // }

    closeBookingModal() {
    this.selectedHotelForBooking = null;
    }

    openReschedule(booking: any) {
      this.selectedBooking = booking;
      this.selectedHotel=null;

    }

  cancelBooking(bookingId: string) {
  this.bookedService.cancel(bookingId).subscribe(() => {
    alert('Booking cancelled');
    this.selectedHotel = null;
    this.loadHotels();
  });
}

}
