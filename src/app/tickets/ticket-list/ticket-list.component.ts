import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TicketService } from '../../services/ticket.service';
import { Ticket } from '../../models/ticket.model';
import { TicketDeleteDialogComponent } from '../ticket-delete-dialog/ticket-delete-dialog.component';
import { TicketFormComponent } from '../ticket-form/ticket-form.component';
import { PageEvent } from '@angular/material/paginator';
import { DatePipe } from '@angular/common';
import { MatSort } from '@angular/material/sort'; 
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.sass']
})
export class TicketListComponent implements OnInit {
  tickets: Ticket[] = [];
  totalCount: number = 0;
  pageSize: number = 5;
  pageNumber: number = 1;
  searchQuery: string = "";

  dataSource = new MatTableDataSource<Ticket>();
  displayedColumns: string[] = ['ticketId', 'description', 'status', 'dateCreated', 'actions'];

  @ViewChild(MatSort) sort: MatSort | null = null;

  constructor(private ticketService: TicketService, private dialog: MatDialog, private datePipe: DatePipe) {}

  ngOnInit(): void {
    this.loadTickets();
  }

  loadTickets(): void {
    this.ticketService.getTickets(this.pageNumber, this.pageSize, this.searchQuery).subscribe({
      next: (ticketResponse) => {
        this.tickets = ticketResponse.tickets
        this.totalCount = ticketResponse.totalCount;
        this.pageSize = ticketResponse.pageSize;
        this.pageNumber = ticketResponse.pageNumber;
        this.dataSource.data = this.tickets;

        if (this.sort) {
          this.dataSource.sort = this.sort;
        }

        console.log(this.dataSource.data)
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

  openAddDialog(): void {
    const dialogRef = this.dialog.open(TicketFormComponent, {
      width: '400px',
      data: { ticket: null }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadTickets();
      }
    });
  }

  openEditDialog(ticket: Ticket): void {
    const dialogRef = this.dialog.open(TicketFormComponent, {
      width: '400px',
      data: { ticket }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadTickets();
      }
    });
  }

  onPageChange(event: PageEvent): void {
    this.pageNumber = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.loadTickets();
  }

  changeDateFormat(date: Date) {
    var date = new Date();
    return this.datePipe.transform(date,"MMM-dd-yyyy");
  }

  applyFilter(): void {
    this.loadTickets();
  }
}