import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public apiUrl: string;
  private endPointUser: string = "/Users"


  constructor(private http: HttpClient) {
    this.apiUrl = environment.backendUrl + this.endPointUser;
  }

  getUser(userId: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${userId}`).pipe(
      catchError(this.handleError)
    );
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${user.UserId}`, user).pipe(
      catchError(this.handleError)
    );
  }

  changePassword(userId: number, currentPassword: string, newPassword: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/${userId}/password`, { currentPassword, newPassword }).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('Client-side error:', error.error.message);
    } else {
      console.error(`Server-side error: ${error.status} ${error.message}`);
    }
    return throwError('Something went wrong with the request. Please try again later.');
  }
}
