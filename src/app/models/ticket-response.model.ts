import { Ticket } from './ticket.model';

export interface TicketResponse {
  totalCount: number;
  pageSize: number;
  pageNumber: number;
  tickets: Ticket[];
}