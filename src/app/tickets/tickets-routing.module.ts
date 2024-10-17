import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TicketListComponent } from './ticket-list/ticket-list.component';
import { TicketFormComponent } from './ticket-form/ticket-form.component';

const routes: Routes = [
  { path: 'tickets', component: TicketListComponent },
  { path: 'tickets/create', component: TicketFormComponent },
  { path: 'tickets/edit/:id', component: TicketFormComponent }
];

export const rout = RouterModule.forChild(routes);

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TicketsRoutingModule { }
