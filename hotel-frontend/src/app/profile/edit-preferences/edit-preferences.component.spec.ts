// import { ComponentFixture, TestBed } from '@angular/core/testing';

// import { EditPreferencesComponent } from './edit-preferences.component';

// describe('EditPreferencesComponent', () => {
//   let component: EditPreferencesComponent;
//   let fixture: ComponentFixture<EditPreferencesComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       declarations: [EditPreferencesComponent]
//     })
//     .compileComponents();
    
//     fixture = TestBed.createComponent(EditPreferencesComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditPreferencesComponent } from './edit-preferences.component';
import { ProfileService } from '../profile.service';
import { ReportService } from '../../report/report.service';
import { of } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('EditPreferencesComponent', () => {
  let component: EditPreferencesComponent;
  let fixture: ComponentFixture<EditPreferencesComponent>;
  let profileServiceSpy: jasmine.SpyObj<ProfileService>;
  let reportServiceSpy: jasmine.SpyObj<ReportService>;

  beforeEach(async () => {
    profileServiceSpy = jasmine.createSpyObj('ProfileService', ['updateProfile']);
    reportServiceSpy = jasmine.createSpyObj('ReportService', ['getLocations']);

    await TestBed.configureTestingModule({
      declarations: [EditPreferencesComponent],
      providers: [
        { provide: ProfileService, useValue: profileServiceSpy },
        { provide: ReportService, useValue: reportServiceSpy }
      ],
      schemas: [NO_ERRORS_SCHEMA] // ignore template bindings
    }).compileComponents();

    fixture = TestBed.createComponent(EditPreferencesComponent);
    component = fixture.componentInstance;

    // Mock input user
    component.user = {
      _id: 'user123',
      preferences: {
        defaultLocation: 'Pune',
        defaultAmount: 5000
      }
    };

    // Mock services
    reportServiceSpy.getLocations.and.returnValue(
      of({ locations: ['Pune', 'Mumbai'] })
    );

    profileServiceSpy.updateProfile.and.returnValue(
      of({ success: true })
    );

    // Prevent real browser alert
    spyOn(window, 'alert');

    fixture.detectChanges(); // triggers ngOnInit
  });

  // -------------------------
  // COMPONENT CREATION
  // -------------------------
  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  // -------------------------
  // INIT LOGIC
  // -------------------------
  // it('should initialize preferences from user input', () => {
  //   expect(component.defaultLocation).toBe('Pune');
  //   expect(component.defaultAmount).toBe('5000');
  // });

  // -------------------------
  // LOAD LOCATIONS
  // -------------------------
  it('should load locations on init', () => {
    expect(reportServiceSpy.getLocations).toHaveBeenCalled();
    expect(component.locations.length).toBe(2);
  });

  // -------------------------
  // SAVE PREFERENCES
  // -------------------------
  it('should update profile, show alert and emit events', () => {
    spyOn(component.saved, 'emit');
    spyOn(component.close, 'emit');

    component.defaultLocation = 'Mumbai';
    component.defaultAmount = '3000';

    component.save();

    expect(profileServiceSpy.updateProfile).toHaveBeenCalledWith(
      'user123',
      {
        preferences: {
          defaultLocation: 'Mumbai',
          defaultAmount: '3000'
        }
      }
    );

    expect(window.alert).toHaveBeenCalledWith('Preferences updated');

    expect(component.saved.emit).toHaveBeenCalledWith({
      preferences: {
        defaultLocation: 'Mumbai',
        defaultAmount: '3000'
      }
    });

    expect(component.close.emit).toHaveBeenCalled();
  });
});
