import { Component } from '@angular/core';
import { selectUser } from '../store/auth/auth.selectors';
import { Store } from '@ngrx/store';


@Component({
  templateUrl: './profile.component.html'
})

export class ProfileComponent {

  user: any = JSON.parse(localStorage.getItem('user')!);
  // user: any 

    constructor(private store: Store){}


  // ngOnInit(): void {
  //   //  Correct place for NgRx selector
  //   this.store.select(selectUser).subscribe((user:any) => {
  //     this.user = user;
  //   });
  // }

  
  showEdit = false;
  showPassword = false;

  toggleEdit() { this.showEdit = true; }
  togglePassword() { this.showPassword = true; }

  updateLocal(data: any) {
    console.log(`this is profile component`);
    
    console.log(this.user);
    
    this.user = { ...this.user, ...data };
    localStorage.setItem('user', JSON.stringify(this.user));
  }
}
