import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatComponentsModule } from '@app/mat-components/mat-components.module';
import { OrdersComponent } from './orders.component';



@NgModule({
  declarations: [
    OrdersComponent
  ],
  imports: [
    CommonModule,
    MatComponentsModule
  ]
})
export class OrdersModule { }
