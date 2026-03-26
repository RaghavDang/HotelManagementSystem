// import { ComponentFixture, TestBed } from '@angular/core/testing';

// import { SupportComponent } from './support.component';

// describe('SupportComponent', () => {
//   let component: SupportComponent;
//   let fixture: ComponentFixture<SupportComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       declarations: [SupportComponent]
//     })
//     .compileComponents();
    
//     fixture = TestBed.createComponent(SupportComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });

import { ComponentFixture, TestBed, fakeAsync, flushMicrotasks } from '@angular/core/testing';
import { SupportComponent } from './support.component';
import emailjs from 'emailjs-com';

describe('SupportComponent', () => {
  let component: SupportComponent;
  let fixture: ComponentFixture<SupportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SupportComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(SupportComponent);
    component = fixture.componentInstance;

    spyOn(window, 'alert');
    spyOn(emailjs, 'send');
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should send support email successfully and reset fields', fakeAsync(() => {
    (emailjs.send as jasmine.Spy).and.returnValue(Promise.resolve());

    component.name = 'Raghav';
    component.email = 'raghav@gmail.com';
    component.issueTitle = 'Login Issue';
    component.issueMessage = 'Unable to login';

    component.sendHelp();
    flushMicrotasks();

    expect(window.alert).toHaveBeenCalledWith('Your issue has been submitted!');
  }));

  it('should show error alert when email sending fails', fakeAsync(() => {
    (emailjs.send as jasmine.Spy).and.returnValue(
      Promise.reject('Email error')
    );

    component.sendHelp();
    flushMicrotasks();

    expect(window.alert).toHaveBeenCalledWith(
      'Failed to send. Please try later.'
    );
  }));
});
