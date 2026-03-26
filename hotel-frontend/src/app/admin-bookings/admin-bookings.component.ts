// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-admin-bookings',
//   templateUrl: './admin-bookings.component.html',
//   styleUrl: './admin-bookings.component.css'
// })
// export class AdminBookingsComponent {

// }

import { Component } from '@angular/core';
import { AdminBookingsService } from './admin-bookings.service';


@Component({
  selector: 'app-admin-bookings',
  templateUrl: './admin-bookings.component.html',
  styleUrls: ['./admin-bookings.component.css']
})
export class AdminBookingsComponent {


//  constructor(private service:AdminBookingsService){}
  
  bookings: any=[];
  loading = false;
  errorMessage = '';
  

  constructor(private AdminBookingsService:AdminBookingsService){}

  ngOnInit(): void {
    this.fetchBookings();
  }

  fetchBookings(): void {
    this.loading = true;
    this.errorMessage = '';
    this.AdminBookingsService.getAllBookings().subscribe({
      next: (data) => {
        this.bookings = data.bookings;
        this.loading = false;
        console.log(this.bookings);
        
      },
      error: (err) => {
        this.loading = false;
        this.errorMessage = err?.message || 'Failed to load bookings';
      }
    });
  }

  // Utility: ensure we convert possible ISO strings to Date for display
  asDate(d: string | Date): Date {
    return d instanceof Date ? d : new Date(d);
  }


 

}
