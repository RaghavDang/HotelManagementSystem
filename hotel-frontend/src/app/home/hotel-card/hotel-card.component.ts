

import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-hotel-card',
  templateUrl: './hotel-card.component.html'
})
export class HotelCardComponent {
  @Input() hotel: any;    //Getting hotel from the parent home component
  @Output() open = new EventEmitter<any>();
}
