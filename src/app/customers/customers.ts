import { orders } from "@app/orders/orders";

export interface customers 
{
    customer_id: Number;
    customerOrders: orders[];
    first_name: String;
    last_name: String;
    phone: String;
    email: String;
    street: String;
    city: String;
    state: String;
    zip_code: String;
}