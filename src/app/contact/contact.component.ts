import { Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.sass']
})
export class ContactComponent {
  name: string = '';
  email: string = '';
  message: string = '';

  onSubmit(): void {
    console.log('Message sent:', this.name, this.email, this.message);
    alert('Your message has been sent!');
  }
}
