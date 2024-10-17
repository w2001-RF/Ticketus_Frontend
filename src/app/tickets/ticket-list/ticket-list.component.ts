import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TicketService } from '../../services/ticket.service';
import { Ticket } from '../../models/ticket.model';
import { TicketDeleteDialogComponent } from '../ticket-delete-dialog/ticket-delete-dialog.component';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.sass']
})
export class TicketListComponent implements OnInit {
  tickets: Ticket[] = [];
  totalCount: number = 0;
  pageSize: number = 10;
  pageNumber: number = 1;

  constructor(private ticketService: TicketService, private dialog: MatDialog) {}

  ngOnInit(): void {
    console.log("ngOnInit is running");
    this.loadTickets();
    console.log(this.tickets)
  }

  loadTickets(): void {
    this.ticketService.getTickets().subscribe({
      next: (tickets) => {
        this.tickets = tickets;
      },
      error: (err) => {
        console.error('Error loading tickets:', err);
      }
    });
  }

  openDeleteDialog(ticketId: number): void {
    const dialogRef = this.dialog.open(TicketDeleteDialogComponent, {
      width: '250px',
      data: { ticketId }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.ticketService.deleteTicket(ticketId).subscribe(() => {
          this.tickets = this.tickets.filter(ticket => ticket.ticketId !== ticketId);
        });
      }
    });
  }
}