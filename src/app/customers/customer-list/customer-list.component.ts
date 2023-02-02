import { Component, Input,  Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { customers } from '../customers';


@Component({
    selector: 'app-customer-list',    
    template: `
    <mat-list-item
    *ngFor="let customer of customers"
    layout="row"
    class="pad-xs mat-title">
    {{ customer.customer_id }} - {{ customer.first_name }} {{ customer.last_name }} 
    </mat-list-item>
`,
    //encapsulation: ViewEncapsulation.Emulated,
    //styles: ['th { background-color: #04AA6D; color: white;}']
   })
   export class CustomerListComponent {
    @Input() customers?: customers[];
    @Output() selected = new EventEmitter();
   } // CustomerListComponent


 
