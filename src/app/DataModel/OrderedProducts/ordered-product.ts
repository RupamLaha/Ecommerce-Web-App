import { OrderStatus } from "../OrderStatusEnum/order-status";
import { Products } from "../products";

export class OrderedProduct extends Products {
    orderStatus: number
    quantity: number

    constructor(id: string, name: string, price: number, description: string, orderStatus: number, quantity: number){
        super(id, name, price, description);
        this.quantity = quantity;
        this.orderStatus = orderStatus;
    }
}
