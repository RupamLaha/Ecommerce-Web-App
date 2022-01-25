import { OrderStatus } from "../OrderStatusEnum/order-status";
import { Products } from "../products";

export class OrderedProduct extends Products {
    orderStatus: OrderStatus

    constructor(id: string, name: string, price: number, description: string, orderStatus: OrderStatus){
        super(id, name, price, description);
        this.orderStatus = orderStatus;
    }
}
