import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProfileService } from '../profile.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html'
})
export class ChangePasswordComponent {

  @Input() user: any;
  @Output() close = new EventEmitter();

  oldPass = '';
  newPass = '';

  constructor(private profile: ProfileService) {}

  change() {
    const body = {
      oldPassword: this.oldPass,
      newPassword: this.newPass
    };
    // console.log("CHANGE PASSWORD CLICKED"); 
    // console.log("Sending body:", body);

    this.profile.changePassword(this.user._id, body)
      .subscribe((res: any) => {
        if (!res.success) {
          alert(res.message);
        } else {
          alert('Password changed successfully');
          this.close.emit();
        }
      });
  }
}


