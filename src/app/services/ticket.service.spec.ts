import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TicketService } from './ticket.service';
import { Ticket } from '../models/ticket.model';
import { TicketResponse } from '../models/ticket-response.model';

describe('TicketService', () => {
  let service: TicketService;
  let httpTestingController: HttpTestingController;

  const mockTicket: Ticket = {
    ticketId: 1,
    description: 'Test Ticket',
    status: 'Open',
    dateCreated: new Date()
  };

  const mockTicketResponse: TicketResponse = {
    totalCount: 1,
    pageSize: 10,
    pageNumber: 1,
    tickets: [mockTicket]
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TicketService]
    });
    service = TestBed.inject(TicketService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // Ensure that no unmatched requests are outstanding
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve tickets', () => {
    service.getTickets().subscribe(response => {
      expect(response).toEqual(mockTicketResponse);
      expect(response.tickets.length).toBe(1);
      expect(response.tickets[0].description).toBe(mockTicket.description);
    });

    const req = httpTestingController.expectOne(`${service.apiUrl}?pageNumber=1&pageSize=10&searchTerm=`);
    expect(req.request.method).toEqual('GET');
    req.flush(mockTicketResponse); // Respond with mock ticket data
  });

  it('should retrieve a single ticket by ID', () => {
    service.getTicket(1).subscribe(ticket => {
      expect(ticket).toEqual(mockTicket);
    });

    const req = httpTestingController.expectOne(`${service.apiUrl}/1`);
    expect(req.request.method).toEqual('GET');
    req.flush(mockTicket); // Respond with the mock ticket data
  });

  it('should create a new ticket', () => {
    service.createTicket(mockTicket).subscribe(ticket => {
      expect(ticket).toEqual(mockTicket);
    });

    const req = httpTestingController.expectOne(service.apiUrl);
    expect(req.request.method).toEqual('POST');
    req.flush(mockTicket); // Respond with the created ticket data
  });

  it('should update a ticket', () => {
    service.updateTicket(1, mockTicket).subscribe(() => {});

    const req = httpTestingController.expectOne(`${service.apiUrl}/1`);
    expect(req.request.method).toEqual('PUT');
    req.flush({}); // Respond with an empty object for success
  });

  it('should delete a ticket', () => {
    service.deleteTicket(1).subscribe(() => {});

    const req = httpTestingController.expectOne(`${service.apiUrl}/1`);
    expect(req.request.method).toEqual('DELETE');
    req.flush({}); // Respond with an empty object for success
  });

  it('should handle error on getTickets', () => {
    service.getTickets().subscribe(
      () => fail('expected an error, not tickets'),
      error => expect(error).toContain('Something went wrong with the request')
    );

    const req = httpTestingController.expectOne(`${service.apiUrl}?pageNumber=1&pageSize=10&searchTerm=`);
    req.flush('Error fetching tickets', { status: 404, statusText: 'Not Found' });
  });
});
