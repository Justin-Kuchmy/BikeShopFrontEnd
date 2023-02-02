import { Component, EventEmitter, Input, Output } from '@angular/core';
import { customers } from '@app/customers/customers';
import { products } from '../products';

@Component({
  selector: 'app-product-list',
  template: ` 
  <mat-list-item
  *ngFor="let product of products"
  layout="row"
  class="pad-xs mat-title">
  {{ product.product_id }} - {{ product.product_name }} - {{"\$"}}{{product.list_price}}
  </mat-list-item>`
})
export class ProductListComponent {
    @Input() products?: products[];
    @Output() selected = new EventEmitter();
}
