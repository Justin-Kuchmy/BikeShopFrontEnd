import { Component, OnInit,Output, EventEmitter, Input } from '@angular/core';
import { orders } from '@app/orders/orders';

@Component({
  selector: 'app-customers-orders-list',
  template: `
  <mat-list-item
  *ngFor="let order of orders"
  layout="row"
  class="pad-xs mat-title"
  (click)="selected.emit(order)" > 
  {{ order.order_id }} - {{ order.order_date }}
  </mat-list-item>
`,
})
export class CustomersOrdersListComponent {
    @Input() orders?: orders[];
    @Output() selected = new EventEmitter(); // this is referenced in the html for home.comp.html

}
