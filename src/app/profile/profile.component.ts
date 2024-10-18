import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass']
})
export class ProfileComponent implements OnInit {
  userName: string;
  email: string;

  constructor(private authService: AuthenticationService,) {
    const currentUser = this.authService.getCurrentUser();
    this.userName = currentUser.username;
    this.email = currentUser.Email;
  }

  ngOnInit(): void {}
}
