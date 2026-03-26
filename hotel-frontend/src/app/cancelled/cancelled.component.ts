import { Component, OnInit } from '@angular/core';
import { CancelledService } from './cancelled.service';

@Component({
  templateUrl: './cancelled.component.html'
})
export class CancelledComponent implements OnInit {

  cancelled: any[] = [];
  bookagain: any = null;

  constructor(private cancelledService: CancelledService) {}

  ngOnInit() {
    this.loadBookings();
  }

  loadBookings(){
    const user = JSON.parse(localStorage.getItem('user')!);
    this.cancelledService.getCancelled(user._id).subscribe((res: any) => {
      this.cancelled = res.filter((b: any) => b.status === 'cancelled');
    });
  }


   bookAgain(b: any) {
    this.bookagain = b;
    console.log(this.bookagain);
    
  }

  onRebooked() {
    alert('Hotel booked again successfully!');
    this.bookagain = null;
    this.loadBookings(); // optional refresh

  }
}
