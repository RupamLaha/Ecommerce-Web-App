import { OrderedProduct } from "../OrderedProducts/ordered-product";

export class AdminOrderBookModel extends OrderedProduct {

    buyerName: string;
    buyerEmail: string;
    buyerAddress: string;
    orderId : string

    constructor(id: string, name: string, price: number, description: string, orderStatus: number, quantity: number, buyerName: string, buyerEmail: string, buyerAdd: string, orderId: string){
        super(id, name, price, description, orderStatus, quantity)
        this.buyerName = buyerName
        this.buyerEmail = buyerEmail
        this.buyerAddress = buyerAdd
        this.orderId = orderId
    }

}
