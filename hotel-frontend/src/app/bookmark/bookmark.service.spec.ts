// import { TestBed } from '@angular/core/testing';

// import { BookmarkService } from './bookmark.service';

// describe('BookmarkService', () => {
//   let service: BookmarkService;

//   beforeEach(() => {
//     TestBed.configureTestingModule({});
//     service = TestBed.inject(BookmarkService);
//   });

//   it('should be created', () => {
//     expect(service).toBeTruthy();
//   });
// });

import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { BookmarkService } from './bookmark.service';
import { environment } from '../../environments/environment.it';

describe('BookmarkService', () => {
  let service: BookmarkService;
  let httpMock: HttpTestingController;
  const bookmarksUrl = environment.bookmarksUrl;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BookmarkService]
    });

    service = TestBed.inject(BookmarkService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  // -------------------------
  // SERVICE CREATION
  // -------------------------
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // -------------------------
  // GET BOOKMARKS
  // -------------------------
  it('should fetch bookmarks for a user', () => {
    const userId = 'user123';
    const mockResponse = [
      { id: '1', hotel: 'Taj', userId },
      { id: '2', hotel: 'Oberoi', userId }
    ];

    service.getBookmarks(userId).subscribe((res) => {
      expect(res).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(
      `${bookmarksUrl}?userId=${userId}`
    );

    expect(req.request.method).toBe('GET');

    req.flush(mockResponse);
  });

  // -------------------------
  // REMOVE BOOKMARK
  // -------------------------
  it('should remove a bookmark by id', () => {
    const bookmarkId = 'bookmark123';

    service.remove(bookmarkId).subscribe((res) => {
      expect(res).toBeTruthy();
    });

    const req = httpMock.expectOne(
      `${bookmarksUrl}/${bookmarkId}`
    );

    expect(req.request.method).toBe('DELETE');

    req.flush({ success: true });
  });

  // -------------------------
  // BOOKMARK HOTEL
  // -------------------------
  it('should bookmark a hotel', () => {
    const body = {
      userId: 'user123',
      hotelId: 'hotel456'
    };

    const mockResponse = { success: true };

    service.bookmarkHotel(body).subscribe((res) => {
      expect(res).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(
      `${bookmarksUrl}/add`
    );

    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(body);

    req.flush(mockResponse);
  });

  // -------------------------
  // ERROR HANDLING - GET
  // -------------------------
  it('should handle error while fetching bookmarks', () => {
    service.getBookmarks('user123').subscribe({
      next: () => fail('Expected error, but got success'),
      error: (err) => {
        expect(err).toBeTruthy();
      }
    });

    const req = httpMock.expectOne(
      `${bookmarksUrl}?userId=user123`
    );

    req.error(new ProgressEvent('Network error'));
  });

  // -------------------------
  // ERROR HANDLING - DELETE
  // -------------------------
  it('should handle error while removing bookmark', () => {
    service.remove('bookmark123').subscribe({
      next: () => fail('Expected error, but got success'),
      error: (err) => {
        expect(err).toBeTruthy();
      }
    });

    const req = httpMock.expectOne(
      `${bookmarksUrl}/bookmark123`
    );

    req.error(new ProgressEvent('Network error'));
  });

  // -------------------------
  // ERROR HANDLING - POST
  // -------------------------
  it('should handle error while bookmarking hotel', () => {
    service.bookmarkHotel({}).subscribe({
      next: () => fail('Expected error, but got success'),
      error: (err) => {
        expect(err).toBeTruthy();
      }
    });

    const req = httpMock.expectOne(
      `${bookmarksUrl}/add`
    );

    req.error(new ProgressEvent('Network error'));
  });

  // -------------------------
  // VERIFY NO PENDING REQUESTS
  // -------------------------
  afterEach(() => {
    httpMock.verify();
  });
});
