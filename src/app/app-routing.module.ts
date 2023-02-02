import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CustomerHomeComponent } from './customers/customer-home/customer-home.component';
import { OrdersComponent } from './orders/orders.component';
import { ProductsComponent } from './products/products.component';

const routes: Routes = [
    { path: '', component: HomeComponent, title: 'Home' },
    { path: 'home', component: HomeComponent, title: 'Home' },
    { path: 'customers', component: CustomerHomeComponent, title: 'Customers' },
    { path: 'orders', component: OrdersComponent, title: 'Orders' },
    { path: 'products', component: ProductsComponent, title: 'Products' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
