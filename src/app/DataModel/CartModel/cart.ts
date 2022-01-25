import { Products } from "../products";

export class Cart {
    product: Products
    count: number = 1

    constructor(product: Products){
        this.product = product
    }
}
