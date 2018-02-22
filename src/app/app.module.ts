import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ChartsModule } from 'ng2-charts';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { BusyModule } from 'angular2-busy';

import { AppComponent } from './app.component';
import { routing } from './app.routing';
import { OrderComponent } from './order/order.component';

import { ReportComponent } from './report/report.component';
import { environment } from '../environments/environment';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { AuthService } from './services/auth.service';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    OrderComponent,
    ReportComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    routing,
    ChartsModule,
    FormsModule,
    Ng4LoadingSpinnerModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase, 'angular-auth-firebase'),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    BusyModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
