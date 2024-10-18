import { Component } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.sass']
})
export class SettingsComponent {
  username: string = 'JohnDoe';
  email: string = 'johndoe@example.com';
  password: string = '';

  onSave(): void {
    console.log('User details updated:', this.username, this.email);
    alert('Your details have been updated!');
  }
}
