import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';
import { Router } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { environment } from '../../environments/environment';
declare var gapi : any;

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
})

export class OrderComponent implements OnInit {
  public npsScore: number;

  constructor(private http: HttpClient, private router:Router,
              private spinnerService: Ng4LoadingSpinnerService) { }

  ngOnInit() {
  }

  public goReport() {
    this.router.navigate(['report']);
  }

  public updateReport():any {
    this.spinnerService.show();
    let visits: number = 0;
    let mobileNum: number = 0;
    let desktopNum: number = 0;
    let tabletNum: number = 0;
    let CLIENT_ID = environment.googleClientID;
    let SCOPES = environment.googleScopes;
    let authData = {
      client_id: CLIENT_ID,
      scope: SCOPES,
      immediate: true,
    };

    this.http.get(environment.dateUrl).toPromise()
    .then((dateRespond:any)=>{
      let databaseDate = dateRespond[dateRespond.length-1].start_date;
      let nwDate =  new Date(databaseDate);
      nwDate.setDate(nwDate.getDate()-7);
      let sevenDaysAgo = nwDate.toISOString().split("T")[0];


      gapi.auth.authorize(authData, ()=>{

          gapi.client.load('analytics', 'v3').then(()=> {
          gapi.client.analytics.management.accounts.list().then( (accountResponse:any) =>{
            let accountId = accountResponse.result.items[4].id;
            gapi.client.analytics.management.webproperties.list({'accountId': accountId})
            .then((accountPropertiesResponse:any) => {
              gapi.client.analytics.management.profiles.list({
                  'accountId': accountPropertiesResponse.result.items[0].accountId,
                  'webPropertyId': accountPropertiesResponse.result.items[0].id,
              }).then((profileIdResponse:any)=>{
                gapi.client.analytics.data.ga.get({
                  'ids': 'ga:' + profileIdResponse.result.items[0].id,
                  'start-date': sevenDaysAgo,
                  'end-date': databaseDate,
                  'metrics': 'ga:sessions',
                  'dimensions': 'ga:deviceCategory',
                }).then((coreReportResponse:any)=>{
                  mobileNum = coreReportResponse.result.rows[1][1];
                  desktopNum = coreReportResponse.result.rows[0][1];
                  tabletNum = coreReportResponse.result.rows[2][1];
                  visits = coreReportResponse.result.totalsForAllResults['ga:sessions'];
                });
              });
            });
          });
        });
      });

    }).then(()=>{
    this.http.get(environment.ordersOneUrl)
    .subscribe((pageOneRes:any)=>{
      this.http.get(environment.ordersTwoUrl)
      .subscribe((pageTwoRes:any)=>{
        this.http.get(environment.ordersThreeUrl)
        .subscribe((pageThreeRes:any)=>{
          this.http.get(environment.ordersFourUrl)
          .subscribe((pageFourRes:any)=>{
            this.http.get(environment.ordersFiveUrl)
            .subscribe((pageFiveRes:any)=>{
              let fullResponse = pageOneRes.orders.concat(pageTwoRes.orders).concat(pageThreeRes.orders).concat(pageFourRes.orders).concat(pageFiveRes.orders);
              let revenue:number = 0;
              let dateEnd: string = "";
              let repeatCustomers: number = 0;
              let samples: number = 0;
              let sixPacks: number = 0;
              let twelvePacks: number = 0;
              let twentyFourPacks: number = 0;

              for(let i=0;i<fullResponse.length;i++){
                revenue = revenue + parseFloat(fullResponse[i].total_price);
                if (fullResponse[i].customer.orders_count>1){
                  repeatCustomers++;
                }

                for(let j=0; j<fullResponse[i].line_items.length; j++){
                  if (fullResponse[i].line_items[j].variant_title === "") {
                    samples++;
                  } else if (fullResponse[i].line_items[j].variant_title === "6-Pack") {
                    sixPacks++;
                  } else if (fullResponse[i].line_items[j].variant_title === "12-Pack") {
                    twelvePacks++;
                  } else if (fullResponse[i].line_items[j].variant_title === "24-Pack") {
                    twentyFourPacks++;
                  }
                }
              }

              let promoNum = 0;
              let detractNum = 0;
              let npsNum;
              this.http.get(environment.npsUrl)
              .toPromise().then((res:any)=>{
                for(let i=0; i<res.length;i++){
                  if(res[i][1] >= 9){
                    promoNum++;
                  } else if (res[i][1] <= 6) {
                    detractNum++;
                  }
                }
                let promoPerc = promoNum/res.length;
                let detractPerc = detractNum/res.length;
                npsNum = Math.round((promoPerc-detractPerc)*100);
              }).then(()=>{
              this.http.get(environment.dateUrl)
              .subscribe((dateRes:any)=>{
                let report = {
                  revenue: revenue,
                  dates: dateRes[dateRes.length-1].start_date,
                  repeat_customers: repeatCustomers,
                  total_visits: Number(visits),
                  total_orders: fullResponse.length,
                  average_order_value: revenue/fullResponse.length,
                  conversion_rate: fullResponse.length/visits,
                  new_customers: fullResponse.length - repeatCustomers,
                  samples: samples,
                  six_packs: sixPacks,
                  twelve_packs: twelvePacks,
                  twenty_four_packs: twentyFourPacks,
                  mobiles: Number(mobileNum),
                  desktops: Number(desktopNum),
                  tablets: Number(tabletNum),
                  nps: npsNum
                };
                console.log(report);
                this.http.get(environment.reportsUrl)
                .subscribe((reportRes:any)=>{
                  if (reportRes.find((report)=> report['dates'] == dateRes[dateRes.length-1].start_date) === undefined) {
                    this.http.post(environment.reportsUrl, {report: report})
                    .subscribe(()=>{
                        let databaseDate = dateRes[dateRes.length-1].start_date;
                        let nwDate =  new Date(databaseDate);
                        nwDate.setDate(nwDate.getDate()+7);
                        let updatedDate = nwDate.toISOString().split("T")[0];
                        if (new Date().toISOString().split("T")[0] > updatedDate) {
                          this.http.post(environment.dateUrl, {'input_date': { 'start_date' : updatedDate}})
                          .toPromise().then(()=> {
                            this.goReport();
                            this.spinnerService.hide();
                          });
                        } else {
                          this.goReport();
                          this.spinnerService.hide();
                        }
                      });
                  } else {
                    this.goReport();
                    this.spinnerService.hide();
                  }
                    });
                  });
                });


                });
              });
            });
          });
        });
      });
    }
}
