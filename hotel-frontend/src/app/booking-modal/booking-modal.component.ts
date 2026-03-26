import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BookingModalService } from './booking-modal.service';

@Component({
  selector: 'app-booking-modal',
  templateUrl: './booking-modal.component.html'
})
export class BookingModalComponent {

  @Input() hotel: any;
  @Output() close = new EventEmitter();
  @Output() booked = new EventEmitter();
  // -------------For rescheduling--------------------
  @Input() booking: any = null; // null → normal booking; not null → rescheduling
  @Output() updated = new EventEmitter();
  @Input() cbook: any=null;


  fromDate = '';
  toDate = '';
  roomType = 'Single';
  description = '';

  constructor(private http: HttpClient, private router:Router, private bookingModalService: BookingModalService) {}

  // -------------FFor rescheduling--------------------
  ngOnInit() {
  if (this.booking) {
    // this.fromDate = this.booking.fromDate.substring(0, 10);
    // this.toDate = this.booking.toDate.substring(0, 10);
    // this.roomType = this.booking.roomType;
    // this.description = this.booking.description;
     this.fromDate = this.booking.fromDate?.substring(0, 10);
      this.toDate = this.booking.toDate?.substring(0, 10);
      this.roomType = this.booking.roomType || 'Single';
      this.description = this.booking.description || '';
  }
    console.log(this.booking);
}

isDateValid(): boolean {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // remove time part

  const from = new Date(this.fromDate);
  const to = new Date(this.toDate);

  if (from < today) {
    alert('From date cannot be before today');
    return false;
  }

  if (to < today) {
    alert('To date cannot be before today');
    return false;
  }

  if (to < from) {
    alert('To date cannot be before from date');
    return false;
  }

  return true;
}



  submit() {
     if (!this.isDateValid()) return;
    const user = JSON.parse(localStorage.getItem('user')!);

    // -------------For validation--------------------
     if (!this.fromDate || !this.toDate) {
        alert("Please select From and To dates");
        return;
      }

     if (new Date(this.toDate)<new Date(this.fromDate) ) {
        alert("toDate should be after the fromDate");
        return;
      }

    const body = {
      userId: user._id,
      // hotelId: this.hotel._id,
      hotelId: this.hotel?._id,
      fromDate: this.fromDate,
      toDate: this.toDate,
      roomType: this.roomType,
      description: this.description,
      status:"booked"
    };

    //For rescheduling
    if (this.booking) {
    this.bookingModalService.rescheduleBooking(this.booking._id, body)
      .subscribe((res: any) => {
        if (res.success) {
          alert("Booking rescheduled successfully!");
          this.updated.emit();   
          this.close.emit();
        }
      });
    return;
    }


    //Booking the cancelled hotel again
    if (this.cbook) {
    
    this.bookingModalService.rescheduleBooking(this.cbook._id, body)
      .subscribe((res: any) => {
        if (res.success) {
          // alert("Booking  successfully!");
          this.updated.emit();   
          this.close.emit();
        }
      });
    return;
    }


    // For new booking
   
    this.bookingModalService.bookingHotel(body)
      .subscribe(() => {
        alert('Booking successful');
        this.booked.emit();
        this.close.emit();
        this.router.navigate(['/booked']);
      });


    
    
  }



}
