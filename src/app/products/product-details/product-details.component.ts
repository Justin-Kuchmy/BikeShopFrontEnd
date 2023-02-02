import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { products } from '../products';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit{
    @Input() selectedProduct: products = {
        product_id: 0,
        product_name: "",
        brand_id: 0,
        category_id: 0,
        model_year: 0,
        list_price: 0,  
      };
      msg: string = "";
      hideProductPage: boolean = true;
      @Input() products: products[] | null = null;
      @Output() cancelled = new EventEmitter();

      ngOnInit(): void {
       console.log(`Details ${this.selectedProduct.product_name}`)
    }

    cancel(msg?: string): void {
        msg ? (this.msg = 'Operation cancelled') : null;
        this.hideProductPage = !this.hideProductPage;
      } // cancel
}
