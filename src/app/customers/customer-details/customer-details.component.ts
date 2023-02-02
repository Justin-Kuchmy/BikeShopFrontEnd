import { FormControl,FormGroup,FormBuilder,Validators } from '@angular/forms';
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { customers } from '../customers';
import { orders } from '@app/orders/orders';
import { DeleteDialogComponent } from '@app/delete-dialog/delete-dialog.component';
import { OrdersService } from '@app/orders/orders.service';
import { catchError, map, Observable } from 'rxjs';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.scss'],
})
export class CustomerDetailsComponent implements OnInit {
  @Input() selectedCustomer: customers = {
    customer_id: 0,
    customerOrders: [],
    first_name: '',
    last_name: '',
    phone: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zip_code: '',
  };
  msg: string = "";
  hideOrderPage: boolean = true;
  customersOrders$?: Observable<orders[]>;
  @Input() customers: customers[] | null = null;
  @Output() cancelled = new EventEmitter();
  @Output() saved = new EventEmitter();
  @Output() deleted = new EventEmitter();

  customerForm: FormGroup;
  customer_id: FormControl;
  first_name: FormControl;
  last_name: FormControl;
  phone: FormControl;
  email: FormControl;
  street: FormControl;
  city: FormControl;
  state: FormControl;
  zip_code: FormControl;
  hideEditForm: boolean = true;
  constructor(private builder: FormBuilder, private dialog: MatDialog) {
    this.customer_id = new FormControl(
      '',
      Validators.compose([Validators.required])
    );
    this.first_name = new FormControl(
      '',
      Validators.compose([Validators.required])
    );
    this.last_name = new FormControl(
      '',
      Validators.compose([Validators.required])
    );
    this.phone = new FormControl('', Validators.compose([Validators.required]));
    this.email = new FormControl('', Validators.compose([Validators.required]));
    this.street = new FormControl(
      '',
      Validators.compose([Validators.required])
    );
    this.city = new FormControl('', Validators.compose([Validators.required]));
    this.state = new FormControl('', Validators.compose([Validators.required]));
    this.zip_code = new FormControl(
      '',
      Validators.compose([Validators.required])
    );
    this.customerForm = new FormGroup({
      customer_id: this.customer_id,
      first_name: this.first_name,
      last_name: this.last_name,
      phone: this.phone,
      email: this.email,
      street: this.street,
      city: this.city,
      state: this.state,
      zip_code: this.zip_code,
    });
  }

  ngOnInit(): void {
    this.customerForm.patchValue({
      customer_id:  this.selectedCustomer.customer_id,
      first_name:   this.selectedCustomer.first_name,
      last_name:    this.selectedCustomer.last_name,
      phone:        this.selectedCustomer.phone,
      email:        this.selectedCustomer.email,
      street:       this.selectedCustomer.street,
      city:         this.selectedCustomer.city,
      state:        this.selectedCustomer.state,
      zip_code:     this.selectedCustomer.zip_code,
    });
    // (this.customersOrders$ = this.ordersService.getCustomersOrders(this.selectedCustomer.customer_id)), 
    // catchError((err) => (this.msg = err.message));
  }
  ClickedOrders(): void 
  {
    //make a request to get the orders for the selected customer
    this.hideOrderPage = !this.hideOrderPage;    
  }
  //.map((item: any) => {console.log(item.order_date);})
  cancel(msg?: string): void {
    msg ? (this.msg = 'Operation cancelled') : null;
    this.hideOrderPage = !this.hideOrderPage;
  } // cancel

  updateSelectedCustomer(): void {
    this.selectedCustomer.first_name = this.customerForm.value.first_name;
    this.selectedCustomer.last_name = this.customerForm.value.last_name;
    this.selectedCustomer.phone = this.customerForm.value.phone;
    this.selectedCustomer.email = this.customerForm.value.email;
    this.selectedCustomer.street = this.customerForm.value.street;
    this.selectedCustomer.city = this.customerForm.value.city;
    this.selectedCustomer.state = this.customerForm.value.state;
    this.selectedCustomer.zip_code = this.customerForm.value.zip_code;
    this.saved.emit(this.selectedCustomer);
  }

  openDeleteDialog(selectedCustomer: customers): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = false;
    dialogConfig.data = {
      title: `Delete Customer ${this.selectedCustomer.customer_id}`,
      entityname: 'Customer',
    };
    dialogConfig.panelClass = 'customdialog';
    const dialogRef = this.dialog.open(DeleteDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleted.emit(this.selectedCustomer);
      }
    });
  } // openDeleteDialog
}
