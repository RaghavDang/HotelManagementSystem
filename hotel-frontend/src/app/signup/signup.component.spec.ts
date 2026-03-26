// import { ComponentFixture, TestBed } from '@angular/core/testing';

// import { SignupComponent } from './signup.component';

// describe('SignupComponent', () => {
//   let component: SignupComponent;
//   let fixture: ComponentFixture<SignupComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       declarations: [SignupComponent]
//     })
//     .compileComponents();
    
//     fixture = TestBed.createComponent(SignupComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SignupComponent } from './signup.component';
import { SignupService } from './signup.service';
import { ReportService } from '../report/report.service';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;
  let signupServiceSpy: jasmine.SpyObj<SignupService>;
  let reportServiceSpy: jasmine.SpyObj<ReportService>;
  let router: Router;

  beforeEach(async () => {
    signupServiceSpy = jasmine.createSpyObj('SignupService', ['register']);
    reportServiceSpy = jasmine.createSpyObj('ReportService', ['getLocations']);

    await TestBed.configureTestingModule({
      declarations: [SignupComponent],
      imports: [FormsModule, ],
      providers: [
        { provide: SignupService, useValue: signupServiceSpy },
        { provide: ReportService, useValue: reportServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);

    spyOn(window, 'alert');
    spyOn(router, 'navigate');

    // mock locations API
    reportServiceSpy.getLocations.and.returnValue(
      of({ locations: ['Pune', 'Mumbai'] })
    );

    fixture.detectChanges(); // triggers ngOnInit()
  });

  // -------------------------
  // COMPONENT CREATION
  // -------------------------
  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  // -------------------------
  // LOAD LOCATIONS ON INIT
  // -------------------------
  it('should load locations on init', () => {
    expect(reportServiceSpy.getLocations).toHaveBeenCalled();
    expect(component.locations.length).toBe(2);
  });

  // -------------------------
  // INVALID EMAIL
  // -------------------------
  it('should show alert for invalid email', () => {
    component.email = 'abc@gmail';
    component.password = 'Test123';
    component.defaultAmount = 100;

    component.submit();

    expect(window.alert).toHaveBeenCalledWith(
      'Enter a valid email ending with .com or .in'
    );
    expect(signupServiceSpy.register).not.toHaveBeenCalled();
  });

  // -------------------------
  // INVALID PASSWORD
  // -------------------------
  it('should show alert for invalid password', () => {
    component.email = 'test@gmail.com';
    component.password = 'test';
    component.defaultAmount = 100;

    component.submit();

    expect(window.alert).toHaveBeenCalledWith(
      'Password must be at least 6 characters, contain 1 uppercase letter & 1 digit.'
    );
    expect(signupServiceSpy.register).not.toHaveBeenCalled();
  });

  // -------------------------
  // EMPTY DEFAULT AMOUNT
  // -------------------------
  it('should show alert if default amount is empty', () => {
    component.email = 'test@gmail.com';
    component.password = 'Test123';
    component.defaultAmount = '';

    component.submit();

    expect(window.alert).toHaveBeenCalledWith(
      'Default amount is required.'
    );
  });

  // -------------------------
  // NEGATIVE DEFAULT AMOUNT
  // -------------------------
  it('should show alert for negative default amount', () => {
    component.email = 'test@gmail.com';
    component.password = 'Test123';
    component.defaultAmount = -10;

    component.submit();

    expect(window.alert).toHaveBeenCalledWith(
      'Default amount cannot be negative.'
    );
  });

  // -------------------------
  // SUCCESSFUL SIGNUP
  // -------------------------
  it('should register user and navigate to login on success', () => {
    signupServiceSpy.register.and.returnValue(
      of({ success: true })
    );

    component.name = 'Raghav';
    component.email = 'test@gmail.com';
    component.password = 'Test123';
    component.defaultAmount = 500;
    component.defaultLocation = 'Pune';

    component.submit();

    expect(signupServiceSpy.register).toHaveBeenCalledWith({
      name: 'Raghav',
      email: 'test@gmail.com',
      password: 'Test123',
      preferences: {
        defaultAmount: 500,
        defaultLocation: 'Pune'
      }
    });

    expect(window.alert).toHaveBeenCalledWith(
      'Registration successful. Please login.'
    );
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });

  // -------------------------
  // EMAIL ALREADY EXISTS
  // -------------------------
  it('should show error alert if email already exists', () => {
    signupServiceSpy.register.and.returnValue(
      of({ success: false, msg: 'Email already exists' })
    );

    component.email = 'test@gmail.com';
    component.password = 'Test123';
    component.defaultAmount = 100;

    component.submit();

    expect(window.alert).toHaveBeenCalledWith('Email already exists');
  });
});
