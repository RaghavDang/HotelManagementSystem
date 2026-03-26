import { TestBed } from '@angular/core/testing';

import { AdminHotelsService } from './admin-hotels.service';

describe('AdminHotelsService', () => {
  let service: AdminHotelsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminHotelsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
