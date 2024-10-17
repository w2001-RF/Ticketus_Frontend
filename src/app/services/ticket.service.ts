import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Ticket } from '../models/ticket.model';
import { TicketResponse } from '../models/ticket-response.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  private apiUrl: string;
  private endPointTickets: string = "/Tickets"

  constructor(private http: HttpClient) { 
    this.apiUrl = environment.backendUrl + this.endPointTickets; console.log(this.apiUrl)
  }

  getHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken');
    return new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json');
  }

  getTickets(): Observable<Ticket[]> {
    return this.http.get<TicketResponse>(this.apiUrl, { headers: this.getHeaders() }).pipe(
      map((response: TicketResponse) => response.tickets),
      catchError(this.handleError)
    );
  }

  getTicket(id: number): Observable<Ticket> {
    return this.http.get<Ticket>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() }).pipe(
      catchError(this.handleError)
    );
  }

  createTicket(ticket: Ticket): Observable<Ticket> {
    return this.http.post<Ticket>(this.apiUrl, ticket, { headers: this.getHeaders() }).pipe(
      catchError(this.handleError)
    );
  }

  updateTicket(id: number, ticket: Ticket): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, ticket, { headers: this.getHeaders() }).pipe(
      catchError(this.handleError)
    );
  }

  deleteTicket(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() }).pipe(
      catchError(this.handleError)
    );
  }
  

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      console.error('Client-side error:', error.error.message);
    } else {
      // Server-side error
      console.error(`Server-side error: ${error.status} ${error.message}`);
    }
    return throwError('Something went wrong with the request. Please try again later.');
  }
}
