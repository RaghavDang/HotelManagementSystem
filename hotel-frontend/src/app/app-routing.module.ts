import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';

import { AuthGuard } from './auth.guard';
import { SignupComponent } from './signup/signup.component';
import { ProfileComponent } from './profile/profile.component';
import { SupportComponent } from './support/support.component';
import { BookedComponent } from './booked/booked.component';
import { CancelledComponent } from './cancelled/cancelled.component';
import { BookmarkComponent } from './bookmark/bookmark.component';
import { ReportComponent } from './report/report.component';
import { AdminBookingsComponent } from './admin-bookings/admin-bookings.component';
import { AdminHotelsComponent } from './admin-hotels/admin-hotels.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },

  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'booked', component: BookedComponent, canActivate: [AuthGuard] },
  { path: 'cancelled', component: CancelledComponent, canActivate: [AuthGuard] },
  { path: 'bookmark', component: BookmarkComponent, canActivate: [AuthGuard] },
  { path: 'report', component: ReportComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'help', component: SupportComponent, canActivate: [AuthGuard] },
  { path: 'admin/bookings', component: AdminBookingsComponent},
  { path: 'admin/hotels', component: AdminHotelsComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
