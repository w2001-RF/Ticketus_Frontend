import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TicketFormComponent } from './ticket-form.component';
import { TicketService } from '../../services/ticket.service';
import { of } from 'rxjs';

class MockTicketService {
  createTicket(ticket: any) {
    return of(ticket); // Mock implementation for creating a ticket
  }

  updateTicket(ticketId: number, ticket: any) {
    return of(ticket); // Mock implementation for updating a ticket
  }
}

class MockDialogRef {
  close(result?: any): void {
  }
}

describe('TicketFormComponent', () => {
  let component: TicketFormComponent;
  let fixture: ComponentFixture<TicketFormComponent>;
  let ticketService: TicketService;
  let dialogRef: MatDialogRef<TicketFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [TicketFormComponent],
      providers: [
        { provide: TicketService, useClass: MockTicketService },
        { provide: MatDialogRef, useClass: MockDialogRef },
        { provide: MAT_DIALOG_DATA, useValue: { ticket: null } } // Set to null for new ticket
      ]
    }).compileComponents();
    
    fixture = TestBed.createComponent(TicketFormComponent);
    component = fixture.componentInstance;
    ticketService = TestBed.inject(TicketService);
    dialogRef = TestBed.inject(MatDialogRef);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with empty values', () => {
    expect(component.ticketForm.value).toEqual({
      description: '',
      status: ''
    });
  });

  it('should call createTicket on save when creating a new ticket', () => {
    const ticketData = { description: 'Test ticket', status: 'Open' };
    component.ticketForm.setValue(ticketData);

    spyOn(ticketService, 'createTicket').and.callThrough();
    spyOn(dialogRef, 'close');

    component.onSave();

    expect(ticketService.createTicket).toHaveBeenCalledWith(jasmine.objectContaining(ticketData));
    expect(dialogRef.close).toHaveBeenCalledWith(true);
  });

  it('should call updateTicket on save when updating an existing ticket', () => {
    const existingTicket = { ticketId: 1, description: 'Existing ticket', status: 'Closed', dateCreated: new Date()};
    component.data.ticket = existingTicket; // Simulating an existing ticket
    component.ticketForm.setValue({ description: 'Updated ticket', status: 'Open' });

    spyOn(ticketService, 'updateTicket').and.callThrough();
    spyOn(dialogRef, 'close');

    component.onSave();

    expect(ticketService.updateTicket).toHaveBeenCalledWith(existingTicket.ticketId, jasmine.objectContaining({ 
      description: 'Updated ticket', 
      status: 'Open' 
    }));
    expect(dialogRef.close).toHaveBeenCalledWith(true);
  });

  it('should call onCancel and close the dialog without saving', () => {
    spyOn(dialogRef, 'close');

    component.onCancel();

    expect(dialogRef.close).toHaveBeenCalled();
  });

  it('should not call create or update when the form is invalid', () => {
    spyOn(ticketService, 'createTicket');
    spyOn(ticketService, 'updateTicket');

    component.onSave();

    expect(ticketService.createTicket).not.toHaveBeenCalled();
    expect(ticketService.updateTicket).not.toHaveBeenCalled();
  });
});
