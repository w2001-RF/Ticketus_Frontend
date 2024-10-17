import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-ticket-delete-dialog',
  templateUrl: './ticket-delete-dialog.component.html',
  styleUrls: ['./ticket-delete-dialog.component.sass']
})
export class TicketDeleteDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<TicketDeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { ticketId: number }
  ) {}

  onDelete(): void {
    this.dialogRef.close(true);
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}