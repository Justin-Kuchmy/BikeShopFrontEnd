import { Component, EventEmitter, Input, Output } from '@angular/core';
import { products } from '../products';

@Component({
  selector: 'app-product-list',
  template: `
    <mat-grid-list cols="3" class="product-list" >
      <mat-grid-tile class="product-tile" *ngFor="let product of products" (click)="listSelect(product)">
        <mat-card class="product-card">
          {{ product.product_name }}   {{ '$'
          }}{{ product.list_price }}
          <img class="product-img" src="./assets/bike.png">
        </mat-card>
      </mat-grid-tile>
    </mat-grid-list>
  `,
  styleUrls: ['./product-list.scss'],
})
export class ProductListComponent {
    
  @Input() products?: products[];
  @Output() selectedItem = new EventEmitter<products>();
  listSelect(selectedProduct: products)
  {
    console.log(`Selected product ${selectedProduct.product_id}`)
    this.selectedItem.emit(selectedProduct);
  }

}
