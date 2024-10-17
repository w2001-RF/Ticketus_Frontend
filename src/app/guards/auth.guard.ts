import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private jwtHelper: JwtHelperService
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    const token = this.authService.getToken();

    // Check if the token exists and is not expired
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      return true;
    }

    // Redirect to login if the token is missing or expired
    this.router.navigate(['/auth/login']);
    return false;
  }
}