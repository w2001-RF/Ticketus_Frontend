import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'tickets',
    loadChildren: () => import('./tickets/tickets.module').then(m => m.TicketsModule),
    canActivate: [AuthGuard]
  },
  { path: '', redirectTo: '/tickets', pathMatch: 'full' },
  { path: '**', redirectTo: '/tickets' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
