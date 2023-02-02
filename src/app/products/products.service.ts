import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenericHttpService } from '@app/generic-http.service';
import { products } from './products';

@Injectable({
  providedIn: 'root',
})
export class ProductsService extends GenericHttpService<products> {
  constructor(httpClient: HttpClient) {
    super(httpClient, `products`);
  } // constructor
}
