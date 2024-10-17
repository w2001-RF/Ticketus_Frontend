import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
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
    });
  }

  signup(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/signup`, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
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
  
}
