// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-admin-hotels',
//   templateUrl: './admin-hotels.component.html',
//   styleUrl: './admin-hotels.component.css'
// })
// export class AdminHotelsComponent {

// }

import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminHotelsService } from './admin-hotels.service';

@Component({
  selector: 'app-admin-hotels',
  templateUrl: './admin-hotels.component.html',
  styleUrls: ['./admin-hotels.component.css']
})
export class AdminHotelsComponent {


hotel = {
    name: '',
    location: '',
    rating: '',
    price: '',
    roomType: '',
    features: '',
    description: '',
    images: ''
  };

  constructor(private hotelService: AdminHotelsService) {}

  submitHotel() {
    const payload = {
      ...this.hotel,
      features: this.hotel.features.split(',').map(f => f.trim()),
      images: this.hotel.images.split(',').map(i => i.trim()),
      rating: Number(this.hotel.rating),
      price: Number(this.hotel.price),
    };

    this.hotelService.addHotel(payload).subscribe({
      next: (res) => {
        alert('Hotel added successfully!');
        this.hotel = {
          name: '',
          location: '',
          rating: '',
          price: '',
          roomType: '',
          features: '',
          description: '',
          images: ''
        };
      },
      error: () => alert('Error adding hotel')
    });
  }


}