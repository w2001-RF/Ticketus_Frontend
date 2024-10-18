import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthenticationService } from './authentication.service';

describe('AuthenticationService', () => {
  let service: AuthenticationService;
  let httpTestingController: HttpTestingController;

  const mockToken = 'mock.jwt.token';
  const mockUser = { username: 'testuser', email: 'test@example.com' };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthenticationService]
    });
    service = TestBed.inject(AuthenticationService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // Ensure that no unmatched requests are outstanding
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should log in the user', () => {
    const loginData = { email: 'test@example.com', password: 'password' };

    service.login(loginData).subscribe(response => {
      expect(response.token).toEqual(mockToken);
    });

    const req = httpTestingController.expectOne(`${service.apiUrl}/login`);
    expect(req.request.method).toEqual('POST');
    req.flush({ token: mockToken }); // Respond with mock token data
  });

  it('should sign up the user', () => {
    const signupData = { username: 'testuser', email: 'test@example.com', password: 'password' };

    service.signup(signupData).subscribe(response => {
      expect(response.token).toEqual(mockToken);
    });

    const req = httpTestingController.expectOne(`${service.apiUrl}/signup`);
    expect(req.request.method).toEqual('POST');
    req.flush({ token: mockToken }); // Respond with mock token data
  });

  it('should save the token to localStorage', () => {
    service.saveToken(mockToken);
    expect(localStorage.getItem('authToken')).toEqual(mockToken);
  });

  it('should retrieve the token from localStorage', () => {
    localStorage.setItem('authToken', mockToken);
    expect(service.getToken()).toEqual(mockToken);
  });

  it('should clear the token from localStorage', () => {
    localStorage.setItem('authToken', mockToken);
    service.clearToken();
    expect(localStorage.getItem('authToken')).toBeNull();
  });

  it('should return the current username from token', () => {
    const token = 'header.' + btoa(JSON.stringify(mockUser)) + '.signature';
    localStorage.setItem('authToken', token);

    expect(service.getUserName()).toEqual('testuser');
  });

  it('should return null if there is no token', () => {
    localStorage.removeItem('authToken');
    expect(service.getCurrentUser()).toBeNull();
  });

  it('should handle error on login', () => {
    const loginData = { email: 'test@example.com', password: 'wrongpassword' };

    service.login(loginData).subscribe(
      () => fail('expected an error, not a response'),
      error => expect(error).toContain('Something went wrong with the request')
    );

    const req = httpTestingController.expectOne(`${service.apiUrl}/login`);
    req.flush('Error logging in', { status: 401, statusText: 'Unauthorized' });
  });
});
