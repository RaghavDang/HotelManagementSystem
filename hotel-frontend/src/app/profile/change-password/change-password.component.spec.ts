// import { ComponentFixture, TestBed } from '@angular/core/testing';

// import { ChangePasswordComponent } from './change-password.component';

// describe('ChangePasswordComponent', () => {
//   let component: ChangePasswordComponent;
//   let fixture: ComponentFixture<ChangePasswordComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       declarations: [ChangePasswordComponent]
//     })
//     .compileComponents();
    
//     fixture = TestBed.createComponent(ChangePasswordComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChangePasswordComponent } from './change-password.component';
import { ProfileService } from '../profile.service';
import { of } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('ChangePasswordComponent', () => {
  let component: ChangePasswordComponent;
  let fixture: ComponentFixture<ChangePasswordComponent>;
  let profileServiceSpy: jasmine.SpyObj<ProfileService>;

  beforeEach(async () => {
    profileServiceSpy = jasmine.createSpyObj('ProfileService', ['changePassword']);

    await TestBed.configureTestingModule({
      declarations: [ChangePasswordComponent],
      providers: [
        { provide: ProfileService, useValue: profileServiceSpy }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(ChangePasswordComponent);
    component = fixture.componentInstance;

    // Mock @Input() user
    component.user = { _id: 'user123' };

    // Prevent real browser alert
    spyOn(window, 'alert');

    fixture.detectChanges();
  });

  // -------------------------
  // COMPONENT CREATION
  // -------------------------
  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  // -------------------------
  // PASSWORD CHANGE FAILURE
  // -------------------------
  it('should show error alert when password change fails', () => {
    profileServiceSpy.changePassword.and.returnValue(
      of({ success: false, message: 'Old password incorrect' })
    );

    component.oldPass = 'Old123';
    component.newPass = 'New123';

    component.change();

    expect(profileServiceSpy.changePassword).toHaveBeenCalledWith(
      'user123',
      {
        oldPassword: 'Old123',
        newPassword: 'New123'
      }
    );

    expect(window.alert).toHaveBeenCalledWith('Old password incorrect');
  });

  // -------------------------
  // PASSWORD CHANGE SUCCESS
  // -------------------------
  it('should show success alert and emit close event on success', () => {
    profileServiceSpy.changePassword.and.returnValue(
      of({ success: true })
    );

    spyOn(component.close, 'emit');

    component.oldPass = 'Old123';
    component.newPass = 'New123';

    component.change();

    expect(window.alert).toHaveBeenCalledWith(
      'Password changed successfully'
    );

    expect(component.close.emit).toHaveBeenCalled();
  });
});
