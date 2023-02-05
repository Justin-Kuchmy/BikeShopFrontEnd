import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { orders } from '@app/orders/orders';
import { OrdersService } from '@app/orders/orders.service';
import { Observable, map, catchError } from 'rxjs';
import { customers } from '../customers';

@Component({
  selector: 'app-customers-orders',
  templateUrl: './customers-orders.component.html',
  styleUrls: ['./customers-orders.component.scss'],
})
export class CustomersOrdersComponent implements OnInit {
  //customersOrders$?: Observable<MatTableDataSource<orders>>;
  customersOrders$?: Observable<orders[]>;
  orders: Array<orders>;
  order: orders;
  msg: String = '';
  hideEditForm: boolean;
  @Input() selectedCustomerChild: customers = {
    customer_id: 0,
    customerOrders: [],
    first_name: '',
    last_name: '',
    phone: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zip_code: '',
  };

  @Output() cancelled = new EventEmitter();
  @Output() saved = new EventEmitter();
  @Output() deleted = new EventEmitter();
  constructor(public ordersService: OrdersService) {
    this.orders = [];
    this.order = {
      order_id: 0,
      customer_id: 0,
      order_status: '',
      order_date: '',
      required_date: '',
      shipped_date: '',
      store_id: 0,
      staff_id: 0,
      orderItems: [],
    };
    this.hideEditForm = true;
  }
  ngOnInit(): void {
    (this.customersOrders$ = this.ordersService.getCustomersOrders(
      this.selectedCustomerChild.customer_id
    )),
      catchError((err) => (this.msg = err.message));
    this.ordersService
      .getCustomersOrders(this.selectedCustomerChild.customer_id)
      .subscribe({
        // Observer object, complete method intrinscally unsubscribes
        next: (payload: any) => {
          payload.forEach((order: any) => {
            this.orders.push(order);
          });
          this.orders = payload.map((x: orders) => x);
        },
        error: (err: Error) => (this.msg = `Get failed! - ${err.message}`),
        complete: () => {},
      }); // subscribe
    //this.orders.forEach(x =>console.log(x));
    console.log(this.orders);
  } // ngOnInit

  select(selectedOrder: orders): void {
    this.order = selectedOrder;
    this.msg = `Order ${selectedOrder.order_id} selected`;
    this.hideEditForm = !this.hideEditForm;
  } // select
  Back(): void 
  {
    this.msg = ``;
    this.hideEditForm = !this.hideEditForm;
  }
}
