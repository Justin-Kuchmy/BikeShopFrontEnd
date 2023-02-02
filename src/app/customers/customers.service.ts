import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenericHttpService } from '@app/generic-http.service';
import { customers } from './customers';
@Injectable({
  providedIn: 'root',
})
export class CustomersService extends GenericHttpService<customers> {
  constructor(httpClient: HttpClient) {
        super(httpClient, `customers`);

  }

}
