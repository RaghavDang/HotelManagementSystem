import { TestBed } from '@angular/core/testing';

import { AdminBookingsService } from './admin-bookings.service';

describe('AdminBookingsService', () => {
  let service: AdminBookingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminBookingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
