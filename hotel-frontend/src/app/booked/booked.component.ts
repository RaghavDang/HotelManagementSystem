import { Component, OnInit } from '@angular/core';
import { BookedService } from './booked.service';

@Component({
  templateUrl: './booked.component.html'
})
export class BookedComponent implements OnInit {

  bookings: any[] = [];
  viewType: 'card' | 'list' = 'card';

  selectedBooking: any = null;

  selectedBookingDetails: any = null;

  constructor(private bookedService: BookedService) {}

  ngOnInit() {
    this.loadBookings();
  }

  loadBookings() {
    const user = JSON.parse(localStorage.getItem('user')!);
    this.bookedService.getBookings(user._id).subscribe((res: any) => {
      this.bookings = res;
    });
  }

  cancel(id: string) {
    if (!confirm('Are you sure?')) return;
    
    this.bookedService.cancel(id).subscribe(() => {
      alert('Booking cancelled');
      this.loadBookings();
    });
  }


  
  
    openReschedule(b: any) {
    this.selectedBooking = b;
    }



    openBookingDetails(booking: any) {
      this.selectedBookingDetails = booking;
      console.log(this.selectedBookingDetails);
      
    }


}
