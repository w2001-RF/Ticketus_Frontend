import { Component } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent {

  constructor(private authService: AuthenticationService, private router: Router) {}

  isAuthenticated(): boolean {
    return this.authService.getToken() !== null;
  }

  getUserName(): string {
    return this.authService.getUserName();
  }

  logout(): void {
    this.authService.clearToken();
    this.router.navigate(['/auth/login']);
  }
}