import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrderComponent } from './order/order.component';
import { ReportComponent } from './report/report.component';
import { LoginComponent } from './login/login.component';


const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'report', component: ReportComponent },
  { path: 'home', component: OrderComponent },
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
