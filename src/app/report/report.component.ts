import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Router} from '@angular/router';


@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  public visits:Array<number>=['Visits'];
  public revenues:Array<number>=['Revenues'];
  public dates:Array<number>=[];
  public orders:Array<number>=['Orders'];
  public avgOrderValue:Array<number>=['Average Order Values'];
  public repeatCustomers:Array<number>=['Repeat Customers'];
  public newCustomers:Array<number>=['New Customers'];
  public mobiles:Array<number>=['Mobile Users'];
  public desktops:Array<number>=['Desktop Users'];
  public tablets:Array<number>=['Tablet Users'];
  public samples:Array<number>=['Samples'];
  public sixPacks:Array<number>=['6-Packs'];
  public twelvePacks:Array<number>=['12-Packs'];
  public twentyFourPacks:Array<number>=['24-Packs'];
  public nPSs:Array<number>=['NPS'];
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
    {data: this.twentyFourPacks, label: '24-Packs'}
    {data: this.nPSs, label: 'NPS'}
  ];
  public lineChartLabels:Array<any> = this.dates;
  public lineChartOptions:any = {
    responsive: true,
    maintainAspectRatio: false
  };

  public lineChartLegend:boolean = true;
  public lineChartType:string = 'line';


  constructor(private http: HttpClient, private router:Router) { }


  ngOnInit() {
    this.http.get("http://localhost:4741/reports").subscribe((res)=>{
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
    });
  }

  public goBack() {
    this.router.navigate(['']);
  }
}