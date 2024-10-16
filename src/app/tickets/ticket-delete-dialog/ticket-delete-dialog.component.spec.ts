import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketDeleteDialogComponent } from './ticket-delete-dialog.component';

describe('TicketDeleteDialogComponent', () => {
  let component: TicketDeleteDialogComponent;
  let fixture: ComponentFixture<TicketDeleteDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TicketDeleteDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TicketDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
