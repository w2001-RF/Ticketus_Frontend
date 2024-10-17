import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TicketService } from '../../services/ticket.service';
import { Ticket } from '../../models/ticket.model';

@Component({
  selector: 'app-ticket-form',
  templateUrl: './ticket-form.component.html',
  styleUrls: ['./ticket-form.component.css']
})
export class TicketFormComponent implements OnInit {
  ticketForm: FormGroup;
  ticketId?: number;

  constructor(
    private fb: FormBuilder,
    private ticketService: TicketService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.ticketForm = this.fb.group({
      description: ['', Validators.required],
      status: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.ticketId = Number(this.route.snapshot.paramMap.get('id'));

    if (this.ticketId) {
      // Edit mode
      this.ticketService.getTicket(this.ticketId).subscribe(ticket => {
        this.ticketForm.patchValue(ticket);
      });
    }
  }

  onSubmit(): void {
    if (this.ticketForm.valid) {
      const ticketData: Ticket = this.ticketForm.value;

      if (this.ticketId) {
        // Update existing ticket
        this.ticketService.updateTicket(this.ticketId, ticketData).subscribe(() => {
          this.router.navigate(['/tickets']);
        });
      } else {
        // Create new ticket
        this.ticketService.createTicket(ticketData).subscribe(() => {
          this.router.navigate(['/tickets']);
        });
      }
    }
  }
}