import { TestBed } from '@angular/core/testing';
import { CanActivate, Router } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { AuthenticationService } from '../services/authentication.service';
import { JwtHelperService } from '@auth0/angular-jwt';

class MockAuthenticationService {
  getToken() {
    return 'mock.token'; // Default mock token for tests
  }
}

class MockRouter {
  navigate(path: string[]) {
    return path;
  }
}

class MockJwtHelperService {
  isTokenExpired(token: string): Promise<boolean> {
    return Promise.resolve(false); // Mock implementation, assuming the token is not expired
  }
}

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let authService: AuthenticationService;
  let router: Router;
  let jwtHelper: JwtHelperService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: AuthenticationService, useClass: MockAuthenticationService },
        { provide: Router, useClass: MockRouter },
        { provide: JwtHelperService, useClass: MockJwtHelperService }
      ]
    });

    guard = TestBed.inject(AuthGuard);
    authService = TestBed.inject(AuthenticationService);
    router = TestBed.inject(Router);
    jwtHelper = TestBed.inject(JwtHelperService);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should allow activation when token is valid', () => {
    spyOn(authService, 'getToken').and.returnValue('valid.token');
    spyOn(jwtHelper, 'isTokenExpired').and.returnValue(Promise.resolve(false)); // Token is not expired

    const canActivate: boolean = guard.canActivate(null as any, null as any);
    expect(canActivate).toBeTrue();
  });

  it('should deny activation and navigate to login when token is expired', () => {
    spyOn(authService, 'getToken').and.returnValue('expired.token');
    spyOn(jwtHelper, 'isTokenExpired').and.returnValue(Promise.resolve(true)); // Token is expired
    spyOn(router, 'navigate');

    const canActivate: boolean = guard.canActivate(null as any, null as any);
    expect(canActivate).toBeFalse();
    expect(router.navigate).toHaveBeenCalledWith(['/auth/login']);
  });

  it('should deny activation and navigate to login when no token is present', () => {
    spyOn(authService, 'getToken').and.returnValue(null); // No token

    const canActivate: boolean = guard.canActivate(null as any, null as any);
    expect(canActivate).toBeFalse();
    expect(router.navigate).toHaveBeenCalledWith(['/auth/login']);
  });
});
