import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { products } from './products';
import { ProductsService } from '@app/products/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
})
export class ProductsComponent implements OnInit {

  Products$?: Observable<products[]>
  products: Array<products>;
  msg: String = "";
  constructor(public productsService: ProductsService) 
  { 
    this.products = [];
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

}
