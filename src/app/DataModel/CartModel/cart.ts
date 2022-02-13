import { Products } from "../products";

export class Cart {
    product: Products
    count: number

    constructor(product: Products, cnt: number){
        this.product = product
        this.count = cnt
    }
}
