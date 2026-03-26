import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule } from '@angular/forms';


import { HttpClient, HttpClientModule } from '@angular/common/http';

import { RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import { HotelCardComponent } from './home/hotel-card/hotel-card.component';
import { HotelDetailsComponent } from './home/hotel-details/hotel-details.component';
import { ProfileComponent } from './profile/profile.component';
import { ChangePasswordComponent } from './profile/change-password/change-password.component';
import { EditPreferencesComponent } from './profile/edit-preferences/edit-preferences.component';
import { SupportComponent } from './support/support.component';
import { BookedComponent } from './booked/booked.component';
import { BookingModalComponent } from './booking-modal/booking-modal.component';
import { BookmarkComponent } from './bookmark/bookmark.component';
import { CancelledComponent } from './cancelled/cancelled.component';
import { ReportComponent } from './report/report.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/http.interceptor';
// import { HttpInterceptorService } from './interceptors/http.interceptor';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { authReducer } from './store/auth/auth.reducer';
import { AdminBookingsComponent } from './admin-bookings/admin-bookings.component';
import { AdminHotelsComponent } from './admin-hotels/admin-hotels.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    HomeComponent,
    SignupComponent,
    HotelCardComponent,
    HotelDetailsComponent,
    ProfileComponent,
    ChangePasswordComponent,
    EditPreferencesComponent,
    SupportComponent,
    BookedComponent,
    BookingModalComponent,
    BookmarkComponent,
    CancelledComponent,
    ReportComponent,
    AdminBookingsComponent,
    AdminHotelsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
     FormsModule,
     HttpClientModule,
     RouterModule,
     StoreModule.forRoot({}, {}),
     EffectsModule.forRoot([]),
     StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
      StoreModule.forRoot({
      auth: authReducer
    })
  ],
  providers: [ {
    provide: HTTP_INTERCEPTORS,
    // useClass: HttpInterceptorService,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
