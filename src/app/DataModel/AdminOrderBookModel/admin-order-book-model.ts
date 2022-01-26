import { OrderedProduct } from "../OrderedProducts/ordered-product";

export class AdminOrderBookModel extends OrderedProduct {

    buyerName: string;
    buyerEmail: string;
    buyerAddress: string;

    constructor(id: string, name: string, price: number, description: string, quantity: number, buyerName: string, buyerEmail: string, buyerAdd: string){
        super(id, name, price, description, quantity)
        this.buyerName = buyerName
        this.buyerEmail = buyerEmail
        this.buyerAddress = buyerAdd
    }

}
