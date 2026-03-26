
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { HomeService } from '../home.service';
import { HttpClient } from '@angular/common/http';
import { BookmarkService } from '../../bookmark/bookmark.service';
import { BookedService } from '../../booked/booked.service';

@Component({
  selector: 'app-hotel-details',
  templateUrl: './hotel-details.component.html'
})
export class HotelDetailsComponent implements OnInit {

  @Input() hotel: any;
  @Output() close = new EventEmitter();
  @Output() book = new EventEmitter();
  @Output() reschedule = new EventEmitter();
  @Output() cancel = new EventEmitter();

  bookings: any = null;
  booking: any = null;
  isBooked = false;
  isFutureBooking = false;
  similarHotels: any[] = [];
  userId: any=null            //just to get the bookmarkmark hotels of the user with userId
  bookmarkedHotels:any []=[]

  message: string = '';
messageType: 'success' | 'danger' | '' = '';


  constructor(private http: HttpClient, private homeService: HomeService, 
              private bookmarkService:BookmarkService,
              private bookedService: BookedService) {
        const userstr=localStorage.getItem('user');
        if(userstr){
          const user=JSON.parse(userstr);
          this.userId=user._id
        }
  }

  ngOnInit() {
    this.checkBookingStatus();
    this.loadSimilarHotels();
    this.findBookmarkedHotels();
  }

 checkBookingStatus() {
     this.bookedService.getBookings(this.userId).subscribe((res: any) => {
      this.bookings = res;
      console.log("Hotel", this.hotel);
      console.log(this.bookings);
      if(this.bookings){
        this.booking = this.bookings.find((b: any) =>
          b.hotelId._id === this.hotel._id && b.status === 'booked'
        );
      }
    if (this.booking) {
      console.log("Ye to phel se he booked h bhai!!");
      this.isBooked = true;
      this.isFutureBooking = new Date(this.booking.fromDate) > new Date();
    }
    });
  }


  // First getting all the hotel from the home services and then filter it on the basis of same city
  loadSimilarHotels() {
        this.homeService.getHotels({
          location: this.hotel.location
        }).subscribe((res: any) => {
          this.similarHotels = res.filter((x: any) => x._id !== this.hotel._id);
        });
  }

  toggleBookmark() {
    if (this.isBookmarked(this.hotel._id)) {
      console.log("Hta de sale ko bookmark se");
      
      this.unbookmarkHotel();
    } else {
      this.bookmarkHotel();
    }
  }


  // Bookmark the hotel with the corresponding hotelId, userId
  bookmarkHotel() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    const body = {
      userId: user._id,
      hotelId: this.hotel._id
    };

    // this.http.post("http://localhost:5000/api/bookmarks/add", body)
    this.bookmarkService.bookmarkHotel(body)
      .subscribe((res: any) => {
        if (!res.success) {
          alert(res.msg || "Already bookmarked");
          return;
          //  this.message = res.msg || "Already bookmarked";
          // this.messageType = 'danger';
          return;
        }
        alert("Hotel added to bookmarks!");
        //   this.message = "Hotel added to bookmarks!";
        // this.messageType = 'success';
      });
      this.close.emit()
  }

  unbookmarkHotel(){
     const id=this.returnBookmarkedId(this.hotel._id);
     console.log(id);
     
     if(id){
      this.bookmarkService.remove(id)
      .subscribe(()=>{
        alert('Bookmark removed');
      })}

      this.close.emit()
  }

  findBookmarkedHotels() {
    console.log(this.userId);
    // this.http.get<any[]>(`http://localhost:5000/api/bookmarks?userId=${this.userId}`)
    this.bookmarkService.getBookmarks(this.userId)
    .subscribe((res: any)=>{
        this.bookmarkedHotels=res
        console.log(this.bookmarkedHotels);
    })
  }


  isBookmarked(hotelId:string):boolean{
    console.log(this.bookmarkedHotels?.some(h=>h.hotelId._id===hotelId));
    
    return this.bookmarkedHotels?.some(h=>h.hotelId._id===hotelId);
  }

  returnBookmarkedId(hotelId:string):any{
   const found=this.bookmarkedHotels?.find(h=>h.hotelId._id===hotelId);
   console.log(found);
   
   return found?found._id : null;
  }

}
