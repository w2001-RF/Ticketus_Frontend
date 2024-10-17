import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TicketService } from '../../services/ticket.service';
import { Ticket } from '../../models/ticket.model';
import { TicketDeleteDialogComponent } from '../ticket-delete-dialog/ticket-delete-dialog.component';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.css']
})
export class TicketListComponent implements OnInit {
  tickets: Ticket[] = [];

  constructor(private ticketService: TicketService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.ticketService.getTickets().subscribe(data => {
      this.tickets = data;
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
          this.tickets = this.tickets.filter(ticket => ticket.id !== ticketId);
        });
      }
    });
  }
}