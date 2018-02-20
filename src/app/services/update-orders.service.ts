import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class UpdateOrdersService {

  constructor(private http: HttpClient) { }

}
