import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatComponentsModule } from '@app/mat-components/mat-components.module';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { CustomerHomeComponent } from './customer-home/customer-home.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SearchFilterPipe } from './customer-home/SearchFilterPipe'
import { FormsModule } from '@angular/forms';
import { CustomerDetailsComponent } from './customer-details/customer-details.component';
import { CustomersOrdersComponent } from './customers-orders/customers-orders.component';
import { CustomersOrdersListComponent } from './customers-orders/customers-orders-list/customers-orders-list.component';


@NgModule({
  declarations: [
    CustomerListComponent,
    CustomerHomeComponent,
    SearchFilterPipe,
    CustomerDetailsComponent,
    CustomersOrdersComponent,
    CustomersOrdersListComponent
  ],
  imports: [
    CommonModule,
    MatComponentsModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class CustomersModule { }
