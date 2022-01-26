import { OrderStatus } from "../OrderStatusEnum/order-status";
import { Products } from "../products";

export class OrderedProduct extends Products {
    orderStatus: OrderStatus
    quantity: number

    constructor(id: string, name: string, price: number, description: string, quantity: number){
        super(id, name, price, description);
        this.quantity = quantity;
        this.orderStatus = OrderStatus.Pending;
    }
}
