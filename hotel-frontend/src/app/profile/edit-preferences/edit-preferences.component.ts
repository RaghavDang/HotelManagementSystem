
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProfileService } from '../profile.service';
import { ReportService } from '../../report/report.service';

@Component({
  selector: 'app-edit-preferences',
  templateUrl: './edit-preferences.component.html'
})
export class EditPreferencesComponent {

  @Input() user: any;
  @Output() close = new EventEmitter();
  @Output() saved = new EventEmitter();

  defaultLocation = '';
  defaultAmount = '';
  locations =[] ;

  constructor(private profile: ProfileService, private reportService:ReportService) {}

  ngOnInit() {
    this.defaultLocation = this.user.preferences?.defaultLocation || '';
    this.defaultAmount = this.user.preferences?.defaultAmount || '';
    this.loadLocations();
  }

  loadLocations() {
    this.reportService.getLocations().subscribe((res: any) => {
      this.locations = res.locations || [];
    });
  }

  save() {
    const body = {
      preferences: {
        defaultLocation: this.defaultLocation,
        defaultAmount: this.defaultAmount
      }
    };

    this.profile.updateProfile(this.user._id, body)
      .subscribe(() => {
        alert('Preferences updated');

        this.saved.emit(body);
        this.close.emit();
      });
  }
}
