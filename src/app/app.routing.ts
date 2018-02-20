import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrderComponent } from './order/order.component';
import { ReportComponent } from './report/report.component';
const routes: Routes = [
  { path: '', component: OrderComponent },
  { path: 'report', component: ReportComponent },
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
