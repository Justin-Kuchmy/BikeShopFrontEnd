import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenericHttpService } from '@app/generic-http.service';
import { orders } from './orders';
import { BASEURL } from '@app/constants';
import { Observable, retry, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrdersService extends GenericHttpService<orders> {
  constructor(httpClient: HttpClient) {
    super(httpClient, `orders`);
  } // constructor
  
  public getCustomersOrders(customerID: any): Observable<orders[]> {
    var response = this.getHttpClient()
    .get<orders[]>(`${BASEURL}orders/customer/items/${customerID}`)
    .pipe(retry(2), catchError(this.handleError));
    return response;
  } // get all of a customers orders
}
