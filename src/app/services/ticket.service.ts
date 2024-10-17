import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ticket } from '../models/ticket.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  private apiUrl: string;
  private endPointAuthentication: string = "/Tickets"

  constructor(private http: HttpClient) { 
    this.apiUrl = environment.backendUrl + this.endPointAuthentication;
  }

  getHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  getTickets(): Observable<Ticket[]> {
    return this.http.get<Ticket[]>(this.apiUrl, { headers: this.getHeaders() });
  }

  getTicket(id: number): Observable<Ticket> {
    return this.http.get<Ticket>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }

  createTicket(ticket: Ticket): Observable<Ticket> {
    return this.http.post<Ticket>(this.apiUrl, ticket, { headers: this.getHeaders() });
  }

  updateTicket(id: number, ticket: Ticket): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, ticket, { headers: this.getHeaders() });
  }

  deleteTicket(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }
  
}
