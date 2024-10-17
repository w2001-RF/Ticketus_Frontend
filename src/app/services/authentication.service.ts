import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private apiUrl: string;
  private endPointAuthentication: string = "/Authentication"

  constructor(private http: HttpClient) { 
    this.apiUrl = environment.backendUrl + this.endPointAuthentication;
  }

  isLoggedIn(): boolean {
    const authToken = this.getToken();

    return !!authToken;
  }

  login(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).pipe(
      catchError(this.handleError)
    );
  }

  signup(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/signup`, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).pipe(
      catchError(this.handleError)
    );
  }

  saveToken(token: string): void {
    localStorage.setItem('authToken', token);
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');   
  }

  clearToken(): void {
    localStorage.removeItem('authToken');
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
