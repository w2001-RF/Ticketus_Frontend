import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Ticket } from '../../models/ticket.model';
import { TicketService } from '../../services/ticket.service';

@Component({
  selector: 'app-ticket-form',
  templateUrl: './ticket-form.component.html',
  styleUrls: ['./ticket-form.component.sass']
})
export class TicketFormComponent  {
  ticketForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<TicketFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { ticket: Ticket | null },
    private ticketService: TicketService
  ) {
    this.ticketForm = this.fb.group({
      description: [data?.ticket?.description || '', Validators.required],
      status: [data?.ticket?.status || '', Validators.required]
    });
  }

  onSave(): void {
    if (this.ticketForm.valid) {
      if (this.data.ticket) {
        this.ticketService.updateTicket(this.data.ticket.ticketId, this.ticketForm.value).subscribe(() => {
          this.dialogRef.close(true);
        });
      } else {
        const newTicket: Ticket = { ...this.ticketForm.value, dateCreated: new Date() };
        this.ticketService.createTicket(newTicket).subscribe(() => {
          this.dialogRef.close(true);
        });
      }
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}