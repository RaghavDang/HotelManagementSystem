import { Component } from '@angular/core';
import emailjs from 'emailjs-com';

@Component({
  templateUrl: './support.component.html'
})
export class SupportComponent {

  name = '';
  email = '';
  issueTitle = '';
  issueMessage = '';

  sendHelp() {

    const params = {
      name: this.name,
      email: this.email,
      issueTitle: this.issueTitle,
      issueMessage: this.issueMessage
    };

    emailjs.send(
      'service_h38jspr',
      'template_83qf5zl',
      params,
      'a8cKH5NRpmOIjZMnN'
    ).then(() => {
      alert("Your issue has been submitted!");
      this.name = '';
      this.email = '';
      this.issueTitle = '';
      this.issueMessage = '';
    }).catch((err) => {
      alert("Failed to send. Please try later.");
      console.error(err);
    });
  }
}
