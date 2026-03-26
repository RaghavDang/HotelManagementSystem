import { Component, OnInit } from '@angular/core';
import { BookmarkService } from './bookmark.service';

@Component({
  templateUrl: './bookmark.component.html'
})
export class BookmarkComponent implements OnInit {

  bookmarks: any[] = [];
  bookagain: any=null;

  constructor(private bookmarkService: BookmarkService) {}

  ngOnInit() {
    const user = JSON.parse(localStorage.getItem('user')!);

    this.bookmarkService.getBookmarks(user._id).subscribe((res: any) => {
      this.bookmarks = res;
      console.log(this.bookmarks);
    });
  }


  remove(id: string) {
    if (!confirm('Remove bookmark?')) return;

    this.bookmarkService.remove(id).subscribe(() => {
      this.bookmarks = this.bookmarks.filter(b => b._id !== id);
    });
  }

  bookAgain(b:any){
    this.bookagain=b;
  }


  refresh(id:string){
    this.bookmarkService.remove(id).subscribe(() => {
      this.bookmarks = this.bookmarks.filter(b => b._id !== id);
    });
  }
}
