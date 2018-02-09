import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrderComponent } from './order/order.component';

const routes: Routes = [
  { path: '', component: OrderComponent },
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
