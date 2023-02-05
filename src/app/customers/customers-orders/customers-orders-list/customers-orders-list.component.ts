import { Component, OnInit,Output, EventEmitter, Input } from '@angular/core';
import { orders } from '@app/orders/orders';

@Component({
  selector: 'app-customers-orders-list',
  template: `
  <mat-list-item
  *ngFor="let order of orders"
  layout="row"
  class="pad-xs mat-title"
  (click)="selectedItem.emit(order)" > 
  ID: {{ order.order_id }} Date: {{ dateFormat(order.order_date) }}
  </mat-list-item>
`,
})
export class CustomersOrdersListComponent {
    @Input() orders?: orders[];
    @Output() selectedItem = new EventEmitter<orders>();
    listSelect(selectedOrder: orders)
    {
      console.log(`Selected product ${selectedOrder.order_id}`)
      this.selectedItem.emit(selectedOrder);
    }
  

    dateFormat(date: String): String
    {
        return [date.slice(0, 4), "-", date.slice(4, 6), "-", date.slice(6)].join('');;
    }

}
