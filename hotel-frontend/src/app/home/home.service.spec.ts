// import { TestBed } from '@angular/core/testing';

// import { HomeService } from './home.service';

// describe('HomeService', () => {
//   let service: HomeService;

//   beforeEach(() => {
//     TestBed.configureTestingModule({});
//     service = TestBed.inject(HomeService);
//   });

//   it('should be created', () => {
//     expect(service).toBeTruthy();
//   });
// });

import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HomeService } from './home.service';
import { environment } from '../../environments/environment.it';

describe('HomeService', () => {
  let service: HomeService;
  let httpMock: HttpTestingController;

  const hotelUrl = environment.hotelUrl;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HomeService]
    });

    service = TestBed.inject(HomeService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  // -------------------------
  // SERVICE CREATION
  // -------------------------
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // -------------------------
  // GET HOTELS WITH FILTERS
  // -------------------------
  it('should fetch hotels with provided filters', () => {
    const filter = {
      location: 'Pune',
      price: 2000,
      rating: 4
    };

    const mockResponse = [
      { id: 1, name: 'Hotel Taj' },
      { id: 2, name: 'Hotel Oberoi' }
    ];

    service.getHotels(filter).subscribe((res) => {
      expect(res).toEqual(mockResponse);
    });

    const req = httpMock.expectOne((request) =>
      request.url === hotelUrl &&
      request.params.get('location') === 'Pune' &&
      request.params.get('price') === '2000' &&
      request.params.get('rating') === '4'
    );

    expect(req.request.method).toBe('GET');

    req.flush(mockResponse);
  });

  // -------------------------
  // GET HOTELS WITHOUT FILTERS
  // -------------------------
  it('should fetch hotels without any filters', () => {
    service.getHotels().subscribe();

    const req = httpMock.expectOne((request) =>
      request.url === hotelUrl &&
      request.params.keys().length === 0
    );

    expect(req.request.method).toBe('GET');

    req.flush([]);
  });

  // -------------------------
  // GET HOTELS WITH EMPTY FILTER VALUES
  // -------------------------
  it('should ignore empty filter values', () => {
    const filter = {
      location: 'Mumbai',
      price: '',
      rating: ''
    };

    service.getHotels(filter).subscribe();

    const req = httpMock.expectOne((request) =>
      request.url === hotelUrl &&
      request.params.get('location') === 'Mumbai' &&
      !request.params.has('price') &&
      !request.params.has('rating')
    );

    expect(req.request.method).toBe('GET');

    req.flush([]);
  });

  // -------------------------
  // HTTP ERROR HANDLING
  // -------------------------
  it('should handle error when fetching hotels fails', () => {
    service.getHotels({ location: 'Pune' }).subscribe({
      next: () => fail('Expected error, but got success'),
      error: (err) => {
        expect(err).toBeTruthy();
      }
    });
    const req = httpMock.expectOne(hotelUrl);
    req.error(new ProgressEvent('Network error'));
  });

 
  afterEach(() => {
    httpMock.verify();
  });
});
