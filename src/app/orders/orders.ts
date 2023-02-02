import { orderlineitems } from "./orderlineitems";

export interface orders 
{
    order_id: Number;
    customer_id: Number;
    order_status: String;
    order_date: String;
    required_date: String;
    shipped_date: String;
    store_id: Number;
    staff_id: Number;
    orderItems: orderlineitems[];
}