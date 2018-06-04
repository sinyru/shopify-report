import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  public visits:Array<number>=[];
  public revenues:Array<number>=[];
  public dates:Array<number>=[];
  public orders:Array<number>=[];
  public avgOrderValue:Array<any>=[];
  public repeatCustomers:Array<number>=[];
  public newCustomers:Array<number>=[];
  public mobiles:Array<number>=[];
  public desktops:Array<number>=[];
  public tablets:Array<number>=[];
  public samples:Array<number>=[];
  public sixPacks:Array<number>=[];
  public twelvePacks:Array<number>=[];
  public twentyFourPacks:Array<number>=[];
  public nPSs:Array<number>=[];
  public reportProperties:Array<string>=['Dates','Visits','Revenues','Weekly Orders','Average Order Value','Repeat Customers','New Customers','Mobile Users',
                                        'Desktop Users','Tablets Users','Samples','6-Packs','12-Packs','24-Packs', 'NPS'];

  public lineChartData:Array<any> = [
    {data: this.visits, label: 'Visits'},
    {data: this.revenues, label: 'Revenues'},
    {data: this.orders, label: 'Orders'},
    {data: this.avgOrderValue, label: 'Average Order Value'},
    {data: this.repeatCustomers, label: 'Repeat Customers'},
    {data: this.newCustomers, label: 'New Customers'},
    {data: this.mobiles, label: 'Mobile Users'},
    {data: this.desktops, label: 'Desktop Users'},
    {data: this.tablets, label: 'Tablet Users'},
    {data: this.samples, label: 'Samples'},
    {data: this.sixPacks, label: '6-Packs'},
    {data: this.twelvePacks, label: '12-Packs'},
    {data: this.twentyFourPacks, label: '24-Packs'},
    {data: this.nPSs, label: 'NPS'}
  ];
  public lineChartLabels:Array<any> = this.dates;
  public lineChartOptions:any = {
    responsive: true,
    maintainAspectRatio: false
  };

  public lineChartLegend:boolean = true;
  public lineChartType:string = 'line';

  public lineChartColors:Array<any> = [
    { // 1
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'red',
      pointBackgroundColor: 'red',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // 2
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'blue',
      pointBackgroundColor: 'blue',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // 3
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'pink',
      pointBackgroundColor: 'pink',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // 4
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'orange',
      pointBackgroundColor: 'orange',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // 5
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'yellow',
      pointBackgroundColor: 'yellow',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // 6
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'green',
      pointBackgroundColor: 'green',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // 7
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'grey',
      pointBackgroundColor: 'grey',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // 8
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'purple',
      pointBackgroundColor: 'purple',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // 9
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'black',
      pointBackgroundColor: 'black',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // 10
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'orangered',
      pointBackgroundColor: 'orangered',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // 11
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'brown',
      pointBackgroundColor: 'brown',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // 12
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'gold',
      pointBackgroundColor: 'gold',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // 13
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'red',
      pointBackgroundColor: 'red',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // 14
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'green',
      pointBackgroundColor: 'green',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // 15
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'skyblue',
      pointBackgroundColor: 'skyblue',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];

  constructor(private http: HttpClient, private router:Router,
    private spinner: NgxSpinnerService, public authService: AuthService) { }


  ngOnInit() {
    if (this.authService.user === false ){
      this.router.navigate(['']);
    } else {
      this.spinner.show();
      this.http.get(environment.reportsUrl).subscribe((res:any)=>{
        for(let i=0; i<res.length; i++){
          this.visits[i] = res[i].total_visits;
          this.revenues[i] = res[i].revenue;
          this.dates[i] = res[i].dates;
          this.orders[i] = res[i].total_orders;
          this.avgOrderValue[i] = Number(res[i].average_order_value).toFixed(2);
          this.repeatCustomers[i] = res[i].repeat_customers;
          this.newCustomers[i] = res[i].new_customers;
          this.mobiles[i] = res[i].mobiles;
          this.desktops[i] = res[i].desktops;
          this.tablets[i] = res[i].tablets;
          this.samples[i] = res[i].samples;
          this.sixPacks[i] = res[i].six_packs;
          this.twelvePacks[i] = res[i].twelve_packs;
          this.twentyFourPacks[i] = res[i].twenty_four_packs;
          this.nPSs[i] = res[i].nps;
        }
        this.spinner.hide();
      });
    }
  }

  public goBack() {
    this.router.navigate(['home']);
  }
}
