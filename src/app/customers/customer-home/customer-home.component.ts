import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { map, catchError } from 'rxjs/operators';
import { CustomersService } from '../customers.service';
import { SearchFilterPipe } from './SearchFilterPipe';
import { customers } from '../customers';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-customers',
  templateUrl: './customer-home.component.html',
  styleUrls: ['./customer-home.component.scss'],
})
export class CustomerHomeComponent implements OnInit {
  msg: string;
  customers$?: Observable<customers[]>;
  customerDataSource$?: Observable<MatTableDataSource<customers>>;
  customers: customers;
  customerList = [];
  hideEditForm: boolean;
  initialLoad: boolean;

  //sorting
  size: number = 0;
  displayedColumns: string[] = ['id', 'firstname', 'lastname'];
  dataSource: MatTableDataSource<customers> =
    new MatTableDataSource<customers>();
  length: number;
  pageSize: number;
  searchName: String;
  searchID: number;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator?: MatPaginator;

  get SearchName() {
    return this.searchName;
  }
  set SearchName(name: String) {
    this.searchName = name;
  }
  get SearchID() {
    return this.searchID;
  }
  set SearchID(id: number) {
    this.searchID = id;
  }

  constructor(
    public customersService: CustomersService,
    public searchFilterPipe: SearchFilterPipe
  ) {
    this.length = 0;
    this.pageSize = 10;
    this.customers = {
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
    this.customerList;
    this.searchID = 0;
    this.searchName = '';
    this.initialLoad = true;
    this.sort = new MatSort();
    this.msg = ''; 
    this.hideEditForm = true;
  }

  ngOnInit(): void {
    if (this.customerDataSource$ == null) {}
      (this.customerDataSource$ = this.customersService.get().pipe(
        map((customer: any) => {
          const dataSource = new MatTableDataSource<customers>(customer);
          this.dataSource.data = customer;
          this.dataSource.sort = this.sort;
          if (this.paginator !== undefined) {
            this.dataSource.paginator = this.paginator;
          }
          return dataSource;
        })
      )),
        catchError((err) => (this.msg = err.message));
    
  } // ngOnInit

  select(selectedcustomer: customers): void {
    this.customers = selectedcustomer;
    this.msg = `customer ${selectedcustomer.customer_id} selected`;
    this.hideEditForm = !this.hideEditForm;
  } // select

  /**
   * cancelled - event handler for cancel button
   */
  cancel(msg?: string): void {
    msg ? (this.msg = 'Operation cancelled') : null;
    this.hideEditForm = !this.hideEditForm;
  } // cancel

  update(Customers: customers): void {
    this.customersService.update(Customers).subscribe({
      // Create observer object
      next: (emp: customers) =>
        (this.msg = `Customer ${emp} updated!`),
      error: (err: Error) => (this.msg = `Update failed! - ${err.message}`),
      complete: () => (this.hideEditForm = !this.hideEditForm),
    });
  } // update
  /**
   * save - event handler for saved event
   * purpose: check whether we're doing an add or update by seeing
   * if there is an emp id (update) or not (add)
   */
  save(Customers: customers): void {
    Customers.customer_id ? this.update(Customers) : this.add(Customers);
  } // save

  /**
   * add - event handler for click event.
   * Passes new emp data to service and subscribes to services's http post
   * to get the returend Customer.
   */
  add(Customer: customers): void {
    Customer.customer_id = 0;
    this.customersService.add(Customer).subscribe({
      //create observer object
      next: (emp: customers) => {
        this.msg = `customer ${emp.customer_id} added!`;
      },
      error: (err: Error) =>
        (this.msg = `customer not added! - ${err.message}`),
      complete: () => (this.hideEditForm = !this.hideEditForm), //auto hide form after complete
    });
  } // add

  /**
   * delete - event handler for the delete event.
   * passed Customers id to the service and subs to the services https
   * delete to get the value returned which is number of the rows deleted
   */
  delete(customer: customers): void {
    this.customersService.delete(customer.customer_id).subscribe({
      // Create observer object
      next: (numOfCustomerssDeleted: number) => {
        numOfCustomerssDeleted === 1
          ? (this.msg = `Customers ${customer.first_name} ${customer.last_name} deleted!`)
          : (this.msg = `Customers not deleted`);
      },
      error: (err: Error) => (this.msg = `Delete failed! - ${err.message}`),
      complete: () => (this.hideEditForm = !this.hideEditForm),
    });
  } // delete

  /**
   * newCustomers - create new Customers instance
   */
  newCustomers(): void {
    this.customers = {
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
    this.hideEditForm = !this.hideEditForm;
    this.msg = 'New Customer';
  } // newCustomers

  searchByName() {
    this.dataSourcePipe('name', this.searchName);
  }

  dataSourcePipe(prop: String, value: String): void {
    if (value.length === 0) {
      this.ngOnInit();
    } else {
      (this.customerDataSource$ = this.searchFilterPipe
        .getByString(prop, value)
        .pipe(
          map((customer: any) => {
            const dataSource = new MatTableDataSource<customers>(customer);
            this.dataSource.data = customer;
            this.dataSource.sort = this.sort;
            if (this.paginator !== undefined) {
              this.dataSource.paginator = this.paginator;
            }
            return dataSource;
          })
        )),
        catchError((err) => (this.msg = err.message));
    }
  }
  SortProductsWithObjectLiterals(sort: Sort): void {
    const literals = {
      id: () =>
        (this.dataSource.data = this.dataSource.data.sort(
          (a: customers, b: customers) =>
            sort.direction === 'asc'
              ? a.customer_id < b.customer_id
                ? -1
                : 1
              : b.customer_id < a.customer_id // descending
              ? -1
              : 1 // descending
        )),
      firstname: () =>
        (this.dataSource.data = this.dataSource.data.sort(
          (a: customers, b: customers) =>
            sort.direction === 'asc'
              ? a.first_name < b.first_name
                ? -1
                : 1
              : b.first_name < a.first_name // descending
              ? -1
              : 1
        )),
      lastname: () =>
        (this.dataSource.data = this.dataSource.data.sort(
          (a: customers, b: customers) =>
            sort.direction === 'asc'
              ? a.last_name < b.last_name
                ? -1
                : 1
              : b.last_name < a.last_name // descending
              ? -1
              : 1
        )),
    };
    literals[sort.active as keyof typeof literals]();
  }
}
