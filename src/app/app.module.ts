import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ChartsModule } from 'ng2-charts';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';

import { AppComponent } from './app.component';
import { routing } from './app.routing';
import { OrderComponent } from './order/order.component';

import { UpdateOrdersService } from './services/update-orders.service';
import { ReportComponent } from './report/report.component';


@NgModule({
  declarations: [
    AppComponent,
    OrderComponent,
    ReportComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    routing,
    ChartsModule,
    FormsModule,
    Ng4LoadingSpinnerModule.forRoot()
  ],
  providers: [UpdateOrdersService],
  bootstrap: [AppComponent]
})
export class AppModule { }
