import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
})

export class OrderComponent implements OnInit {
  order: any;

  constructor( public http: HttpClient) { }

  ngOnInit() {
    this.http.get("http://localhost:4741/orders").toPromise()
      .then((shopifyResponse:any)=>{
        this.http.get("http://localhost:4741/customer_orders").toPromise()
        .then((databaseOrders:any) =>{
          console.log(databaseOrders);
          for(let i=0;i<shopifyResponse.orders.length;i++){
            if databaseOrders.some((order) => order['order_id'] === shopifyResponse.orders[i].name) === false {
              let order = {
                order_id: shopifyResponse.orders[i].name,
                customer: shopifyResponse.orders[i].customer.first_name + " " + shopifyResponse.orders[i].customer.last_name,
                cost: shopifyResponse.orders[i].total_price,
                repeat_customer: shopifyResponse.orders[i].customer.orders_count>1? true : false,
                date_created: shopifyResponse.orders[i].created_at
              };
              this.http.post("http://localhost:4741/customer_orders", {customer_order: order})
                .subscribe();
            }
          }
        });
      });
  }
}
