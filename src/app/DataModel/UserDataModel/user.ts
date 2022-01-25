import { Cart } from "../CartModel/cart";
import { OrderedProduct } from "../OrderedProducts/ordered-product";
import { Products } from "../products";

export class User {
    email: string;
    name: string;
    password: string;
    address: string;
    wishlist: Products[]
    cart: Cart[]
    orderedHistory: OrderedProduct[]

    constructor(email: string, name: string, password: string, address: string = "", wishlist: Products[] = [], cart: Cart[] = [], orderedHistory: OrderedProduct[] = []){
        this.email = email
        this.name = name
        this.password = password
        this.address = address
        this.wishlist = wishlist
        this.cart = cart
        this.orderedHistory = orderedHistory
    }
}
