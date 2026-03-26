// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { LoginComponent } from './login.component';
// import { FormsModule } from '@angular/forms';
// import { Router } from '@angular/router';
// import { LoginService } from './login.service';
// import { of, throwError } from 'rxjs';

// describe('LoginComponent', () => {
//   let component: LoginComponent;
//   let fixture: ComponentFixture<LoginComponent>;
//   let loginServiceSpy: jasmine.SpyObj<LoginService>;
//   let router: Router;

//   beforeEach(async () => {
//     loginServiceSpy = jasmine.createSpyObj('LoginService', ['login']);

//     await TestBed.configureTestingModule({
//       declarations: [LoginComponent],
//       imports: [FormsModule],
//       providers: [
//         { provide: LoginService, useValue: loginServiceSpy }
//       ]
//     }).compileComponents();

//     fixture = TestBed.createComponent(LoginComponent);
//     component = fixture.componentInstance;
//     router = TestBed.inject(Router);

//     spyOn(window, 'alert'); 
//     spyOn(router, 'navigate');
//   });

 
//   // BASIC CREATION TEST
//   it('should create the component', () => {
//     expect(component).toBeTruthy();
//   });

//   // EMAIL VALIDATION TEST
//   it('should show alert for invalid email', () => {
//     component.email = 'abc@gmail'; // invalid
//     component.password = 'Test123';
//     component.submit();
//     expect(window.alert).toHaveBeenCalledWith(
//       'Enter a valid email ending with .com or .in'
//     );
//     expect(loginServiceSpy.login).not.toHaveBeenCalled();
//   });


//   // PASSWORD VALIDATION TEST

//   it('should show alert for invalid password', () => {
//     component.email = 'test@gmail.com';
//     component.password = 'test'; // invalid

//     component.submit();

//     expect(window.alert).toHaveBeenCalledWith(
//       'Password must be minimum 6 characters long, contain at least 1 uppercase letter and 1 digit.'
//     );
//     expect(loginServiceSpy.login).not.toHaveBeenCalled();
//   });


//   // SUCCESSFUL LOGIN TEST

//   it('should login successfully and navigate to home', () => {
//     const mockResponse = {
//       success: true,
//       user: { name: 'Raghav' }
//     };

//     loginServiceSpy.login.and.returnValue(of(mockResponse));

//     component.email = 'test@gmail.com';
//     component.password = 'Test123';

//     component.submit();

//     expect(loginServiceSpy.login).toHaveBeenCalledWith({
//       email: 'test@gmail.com',
//       password: 'Test123'
//     });

//     expect(router.navigate).toHaveBeenCalledWith(['/home']);
//   });


//   // INVALID CREDENTIALS TEST
//   it('should show alert if credentials are invalid', () => {
//     loginServiceSpy.login.and.returnValue(
//       of({ success: false, msg: 'Invalid credentials' })
//     );

//     component.email = 'test@gmail.com';
//     component.password = 'Test123';

//     component.submit();

//     expect(window.alert).toHaveBeenCalledWith('Invalid credentials');
//   });

//   // SERVER ERROR TEST
//   it('should handle login service error', () => {
//     loginServiceSpy.login.and.returnValue(
//       throwError(() => new Error('Server error'))
//     );

//     component.email = 'test@gmail.com';
//     component.password = 'Test123';

//     component.submit();

//     expect(window.alert).toHaveBeenCalledWith('Server error');
//     expect(window.alert).toHaveBeenCalledWith(
//       'Login failed. Please try again later.'
//     );
//   });
// });

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { of, throwError } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { loginSuccess } from '../store/auth/auth.actions';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let loginServiceSpy: jasmine.SpyObj<LoginService>;
  let routerSpy: jasmine.SpyObj<Router>;
  let storeSpy: jasmine.SpyObj<Store>;

  beforeEach(async () => {
    loginServiceSpy = jasmine.createSpyObj('LoginService', ['login']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    storeSpy = jasmine.createSpyObj('Store', ['dispatch']);

    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      providers: [
        { provide: LoginService, useValue: loginServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: Store, useValue: storeSpy }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;

    spyOn(window, 'alert');
    spyOn(localStorage, 'setItem');

    fixture.detectChanges();
  });

  // -------------------------
  // COMPONENT CREATION
  // -------------------------
  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  // -------------------------
  // INVALID EMAIL
  // -------------------------
  it('should show alert for invalid email', () => {
    component.email = 'abc@gmail';
    component.password = 'Test123';

    component.submit();

    expect(window.alert).toHaveBeenCalledWith(
      'Enter a valid email ending with .com or .in'
    );
    expect(loginServiceSpy.login).not.toHaveBeenCalled();
  });

  // -------------------------
  // INVALID PASSWORD
  // -------------------------
  it('should show alert for invalid password', () => {
    component.email = 'test@gmail.com';
    component.password = 'test';

    component.submit();

    expect(window.alert).toHaveBeenCalledWith(
      'Password must be minimum 6 characters long, contain at least 1 uppercase letter and 1 digit.'
    );
    expect(loginServiceSpy.login).not.toHaveBeenCalled();
  });

  // -------------------------
  // LOGIN SUCCESS
  // -------------------------
  it('should dispatch loginSuccess, store user and navigate on success', () => {
    const mockUser = { _id: 'u1', name: 'Raghav' };

    loginServiceSpy.login.and.returnValue(
      of({ success: true, user: mockUser })
    );

    component.email = 'test@gmail.com';
    component.password = 'Test123';

    component.submit();

    expect(loginServiceSpy.login).toHaveBeenCalledWith({
      email: 'test@gmail.com',
      password: 'Test123'
    });

    expect(storeSpy.dispatch).toHaveBeenCalledWith(
      loginSuccess({ user: mockUser })
    );

    expect(localStorage.setItem).toHaveBeenCalledWith(
      'user',
      JSON.stringify(mockUser)
    );

    expect(routerSpy.navigate).toHaveBeenCalledWith(['/home']);
  });

  // -------------------------
  // INVALID CREDENTIALS
  // -------------------------
  it('should show alert when credentials are invalid', () => {
    loginServiceSpy.login.and.returnValue(
      of({ success: false, msg: 'Invalid credentials' })
    );

    component.email = 'test@gmail.com';
    component.password = 'Test123';

    component.submit();

    expect(window.alert).toHaveBeenCalledWith('Invalid credentials');
  });

  // -------------------------
  // LOGIN SERVICE ERROR
  // -------------------------
  it('should handle login service error', () => {
    loginServiceSpy.login.and.returnValue(
      throwError(() => ({ message: 'Server error' }))
    );

    component.email = 'test@gmail.com';
    component.password = 'Test123';

    component.submit();

    expect(window.alert).toHaveBeenCalledWith('Server error');
    expect(window.alert).toHaveBeenCalledWith(
      'Login failed. Please try again later.'
    );
  });
});
