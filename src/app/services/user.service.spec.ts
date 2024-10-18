import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserService } from './user.service';
import { User } from '../models/user.model';

describe('UserService', () => {
  let service: UserService;
  let httpTestingController: HttpTestingController;
  const mockUser: User = {
    UserId: 1,
    UserName: 'testuser',
    Email: 'test@example.com'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // Import the HttpClientTestingModule
      providers: [UserService]
    });
    service = TestBed.inject(UserService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // Ensure that no unmatched requests are outstanding
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve a user by ID', () => {
    service.getUser(1).subscribe(user => {
      expect(user).toEqual(mockUser);
    });

    const req = httpTestingController.expectOne(`${service.apiUrl}/1`);
    expect(req.request.method).toEqual('GET');
    req.flush(mockUser); // Respond with mock user data
  });

  it('should update a user', () => {
    service.updateUser(mockUser).subscribe(user => {
      expect(user).toEqual(mockUser);
    });

    const req = httpTestingController.expectOne(`${service.apiUrl}/${mockUser.UserId}`);
    expect(req.request.method).toEqual('PUT');
    req.flush(mockUser); // Respond with the updated user data
  });

  it('should change user password', () => {
    const currentPassword = 'oldPassword';
    const newPassword = 'newPassword';

    service.changePassword(mockUser.UserId, currentPassword, newPassword).subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpTestingController.expectOne(`${service.apiUrl}/${mockUser.UserId}/password`);
    expect(req.request.method).toEqual('POST');
    req.flush({}); // Respond with an empty object for success
  });

  it('should handle error on getUser', () => {
    service.getUser(1).subscribe(
      () => fail('expected an error, not users'),
      error => expect(error).toContain('Something went wrong with the request')
    );

    const req = httpTestingController.expectOne(`${service.apiUrl}/1`);
    req.flush('Error fetching user', { status: 404, statusText: 'Not Found' });
  });
});
