import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { products } from '../products';
import { ProductsService } from '@app/products/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products-home.component.html',
})
export class ProductsHomeComponent implements OnInit {

  Products$?: Observable<products[]>
  products: Array<products>;
  msg: String = "";
  hideEditForm: boolean;
  product: products;
  constructor(public productsService: ProductsService) 
  { 
    this.products = [];
    this.hideEditForm = true;
    this.product = {
        product_id: 0,
        product_name: "",
        brand_id: 0,
        category_id: 0,
        model_year: 0,
        list_price: 0,   
      };

  }

  ngOnInit(): void {
    this.Products$ = this.productsService.get();
    this.productsService.get().subscribe({
        // Observer object, complete method intrinscally unsubscribes
        next: (payload: any) => {
        payload.forEach((order: any) => {this.products.push(order);});
        this.products = payload.map((x: products) => x)
        },
        error: (err: Error) => (this.msg = `Get failed! - ${err.message}`),
        complete: () => {},
        }); // subscribe
  }

  select(selectedProduct: products): void {
    this.product = selectedProduct;
    this.msg = `product ${selectedProduct.product_id} selected`;
    this.hideEditForm = !this.hideEditForm;
  } // select

  cancel(msg?: string): void {
    msg ? (this.msg = 'Operation cancelled') : null;
    this.hideEditForm = !this.hideEditForm;
  } // cancel

}
