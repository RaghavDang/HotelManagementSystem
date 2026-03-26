// import { TestBed } from '@angular/core/testing';

// import { ReportService } from './report.service';

// describe('ReportService', () => {
//   let service: ReportService;

//   beforeEach(() => {
//     TestBed.configureTestingModule({});
//     service = TestBed.inject(ReportService);
//   });

//   it('should be created', () => {
//     expect(service).toBeTruthy();
//   });
// });

import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ReportService } from './report.service';
import { environment } from '../../environments/environment.it';

describe('ReportService', () => {
  let service: ReportService;
  let httpMock: HttpTestingController;

  const reportUrl = environment.reportUrl;
  const locationsUrl = environment.locationsUrl;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ReportService]
    });

    service = TestBed.inject(ReportService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  // -------------------------
  // SERVICE CREATION
  // -------------------------
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // -------------------------
  // GET REPORT (ALL PARAMS)
  // -------------------------
  it('should fetch report with all query parameters', () => {
    const params = {
      userId: 'user123',
      location: 'Pune',
      month: 5,
      year: 2025
    };

    const mockResponse = { booked: 10, cancelled: 2 };

    service.getReport(params).subscribe((res) => {
      expect(res).toEqual(mockResponse);
    });

    const req = httpMock.expectOne((request) =>
      request.url === reportUrl &&
      request.params.get('userId') === 'user123' &&
      request.params.get('location') === 'Pune' &&
      request.params.get('month') === '5' &&
      request.params.get('year') === '2025'
    );

    expect(req.request.method).toBe('GET');

    req.flush(mockResponse);
  });

  // -------------------------
  // GET REPORT (ONLY USER ID)
  // -------------------------
  it('should fetch report with only userId param', () => {
    const params = {
      userId: 'user123'
    };

    service.getReport(params).subscribe();

    const req = httpMock.expectOne((request) =>
      request.url === reportUrl &&
      request.params.get('userId') === 'user123' &&
      !request.params.has('location') &&
      !request.params.has('month') &&
      !request.params.has('year')
    );

    expect(req.request.method).toBe('GET');

    req.flush({});
  });

  // -------------------------
  // GET LOCATIONS
  // -------------------------
  it('should fetch locations', () => {
    const mockResponse = {
      locations: ['Pune', 'Mumbai']
    };

    service.getLocations().subscribe((res) => {
      expect(res).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(locationsUrl);

    expect(req.request.method).toBe('GET');

    req.flush(mockResponse);
  });

  // -------------------------
  // VERIFY NO PENDING REQUESTS
  // -------------------------
  afterEach(() => {
    httpMock.verify();
  });
});
