import { Injectable } from '@angular/core';
import { AdminOrderBookModel } from './DataModel/AdminOrderBookModel/admin-order-book-model';
import { Cart } from './DataModel/CartModel/cart';
import { OrderedProduct } from './DataModel/OrderedProducts/ordered-product';
import { OrderStatus } from './DataModel/OrderStatusEnum/order-status';
import { Products } from './DataModel/products';
import { User } from './DataModel/UserDataModel/user';

@Injectable({
  providedIn: 'root'
})
export class EcommerceService {

  public productsArr: Products[] = []

  private adminOrderArr: AdminOrderBookModel[] = []

  // testing purpose
  tempUser = new User("rupam@gmail.com", "rupam", "1234")

  private usersArr: User[] = [this.tempUser]

  constructor() {
    console.log(this.productsArr);
    console.log(this.usersArr);
  }

  // admin functions...

  adminLogin(email: string, pass: string): boolean{
    
    if(email === "laha@gmail.com"){
      if(pass === "1234"){
        localStorage.setItem("adminEmail",email)
        return true
      }else{
        alert("Incorrect password!")
        return false
      }
    }else{
      alert("User not found!")
      return false
    }
  }

  adminLogout(){
    localStorage.removeItem("adminEmail")
  }

  adminAddProducts(id: string, name: string, price: number, description: string) {
    var tempProd = new Products(id, name, price, description);
    this.productsArr.push(tempProd);
    console.log(this.productsArr);
  }

  getProducts(): Products[] {
    return this.productsArr
  }

  adminDeleteProduct(id: string) {
    var index = this.productsArr.findIndex(p => p.id === id)
    this.productsArr.splice(index, 1);
    console.log(index);
  }

  adminEditProductReq(id: string): Products {
    var index = this.productsArr.findIndex(p => p.id === id)
    return this.productsArr[index]
    // console.log(index);
  }

  adminUpdateProduct(id: string, name: string, price: number, desc: string) {
    var index = this.productsArr.findIndex(p => p.id === id)

    this.productsArr[index].name = name
    this.productsArr[index].price = price
    this.productsArr[index].description = desc

    // console.log(index);
  }

  getAdminOrderBook(): AdminOrderBookModel[]{
    return this.adminOrderArr
  }

  adminUpdateOrderStatus(buyeremail: string, status: string, prodId: string){

    //making chang in the user order history arr..
    let index = this.usersArr.findIndex(u => u.email === buyeremail)

    let prodIndex = this.usersArr[index].orderedHistory.findIndex(p => p.id === prodId)

    if(status === "Shipped"){
      this.usersArr[index].orderedHistory[prodIndex].orderStatus = OrderStatus.Shipped
    }else{
      this.usersArr[index].orderedHistory[prodIndex].orderStatus = OrderStatus.Pending
    }

    //making change in the adminOrder arr....
    let adminProdIndex = this.adminOrderArr.findIndex(p => p.id === prodId)

    if(status === "Shipped"){
      this.adminOrderArr[adminProdIndex].orderStatus = OrderStatus.Shipped
    }else{
      this.adminOrderArr[adminProdIndex].orderStatus = OrderStatus.Pending
    }
  }


  // user functions...

  createNewUser(email: string, name: string, password: string) {
    let newUser = new User(email, name, password);

    this.usersArr.push(newUser);

    console.log(this.usersArr);
  }

  loginVerify(email: string, pass: string): boolean {

    var index = this.usersArr.findIndex(u => u.email === email)
    console.log(index);
    if (index !== -1) {
      if (this.usersArr[index].email === email && this.usersArr[index].password === pass) {
        localStorage.setItem("email", email);
        return true;
      } else {
        alert("Wrong Password");
        console.log("Wrong Password");
        return false;
      }
    } else {
      alert("User not registured");
      console.log("User not registured");
      return false;
    }
  }

  getUser(): User{
    
    let localEmail = localStorage.getItem("email");

    let userIndex = this.usersArr.findIndex(u => u.email === localEmail)

    return this.usersArr[userIndex]

  }

  addToWishlist(prodId: string){

    let index = this.productsArr.findIndex(p => p.id === prodId)

    let tempProd: Products = this.productsArr[index]

    let localEmail = localStorage.getItem("email");
    
    let userIndex = this.usersArr.findIndex(u => u.email === localEmail)

    //checking whether this product already exists in the cart or not..
    let duplicateProdIndex = this.usersArr[userIndex].wishlist.findIndex(p => p.id === prodId)

    if(duplicateProdIndex === -1){
      this.usersArr[userIndex].wishlist.push(tempProd);
    }else{
      
    }
  }

  removeFromWishlist(prodId: string){

    let localEmail = localStorage.getItem("email");
    
    let userIndex = this.usersArr.findIndex(u => u.email === localEmail)

    //checking whether this product already exists in the cart or not..
    let prodIndex = this.usersArr[userIndex].wishlist.findIndex(p => p.id === prodId)

    if(prodIndex !== -1){
      this.usersArr[userIndex].wishlist.splice(prodIndex,1);
    }else{
      
    }
  }

  getWishlistArr(): Products[]{
    let localEmail = localStorage.getItem("email");

    let userIndex = this.usersArr.findIndex(u => u.email === localEmail)

    return this.usersArr[userIndex].wishlist
  }

  addProdToCart(prodId: string){

    let index = this.productsArr.findIndex(p => p.id === prodId)

    let tempProd: Products = this.productsArr[index]

    let tempCartProduct: Cart = new Cart(tempProd)

    let localEmail = localStorage.getItem("email");
    
    let userIndex = this.usersArr.findIndex(u => u.email === localEmail)

    //checking whether this product already exists in the cart or not..
    let duplicateProdIndex = this.usersArr[userIndex].cart.findIndex(p => p.product.id === prodId)

    if(duplicateProdIndex !== -1){
      if(this.usersArr[userIndex].cart[duplicateProdIndex].count === 0){
        this.removeFromCart(prodId)
      }else{
        this.usersArr[userIndex].cart[duplicateProdIndex].count += 1
      }
    }else{
      this.usersArr[userIndex].cart.push(tempCartProduct);
    }

  }

  incrementOrDecrement(prodId: string, sign: string){

    if(sign === '+'){
      // this.addProdToCart(prodId)

      let index = this.productsArr.findIndex(p => p.id === prodId)

      let tempProd: Products = this.productsArr[index]

      let tempCartProduct: Cart = new Cart(tempProd)

      let localEmail = localStorage.getItem("email");
      
      let userIndex = this.usersArr.findIndex(u => u.email === localEmail)

      //checking whether this product already exists in the cart or not..
      let duplicateProdIndex = this.usersArr[userIndex].cart.findIndex(p => p.product.id === prodId)

      if(duplicateProdIndex !== -1){
        this.usersArr[userIndex].cart[duplicateProdIndex].count += 1
      }

    }else{

      let index = this.productsArr.findIndex(p => p.id === prodId)

      let tempProd: Products = this.productsArr[index]

      let tempCartProduct: Cart = new Cart(tempProd)

      let localEmail = localStorage.getItem("email");
      
      let userIndex = this.usersArr.findIndex(u => u.email === localEmail)

      //checking whether this product already exists in the cart or not..
      let duplicateProdIndex = this.usersArr[userIndex].cart.findIndex(p => p.product.id === prodId)

      if(duplicateProdIndex !== -1){
        if(this.usersArr[userIndex].cart[duplicateProdIndex].count === 1){
          this.removeFromCart(prodId)
        }else{
          this.usersArr[userIndex].cart[duplicateProdIndex].count -= 1
        }
      }

    }

  }

  removeFromCart(prodId: string){
    let localEmail = localStorage.getItem("email");

    let userIndex = this.usersArr.findIndex(u => u.email === localEmail)

    let prodIndexInCartArr = this.usersArr[userIndex].cart.findIndex(p => p.product.id === prodId)

    console.log(this.usersArr[userIndex].cart)

    this.usersArr[userIndex].cart.splice(prodIndexInCartArr,1)

    console.log(this.usersArr[userIndex].cart)
  }

  totalCartPrice(): {subTotal: number, allTotal: number, deliveryChrg: number}{
    var subTotal = 0
    var deliveryChrg = 0

    let localEmail = localStorage.getItem("email");

    let userIndex = this.usersArr.findIndex(u => u.email === localEmail)

    let cartArr = this.usersArr[userIndex].cart

    for(let cartItem of cartArr){
      let total = cartItem.product.price * cartItem.count
      subTotal += total
    }

    var allTotal = 0
    if(cartArr.length === 0){
      allTotal = deliveryChrg + subTotal
    }else{
      deliveryChrg = 5
      allTotal = deliveryChrg + subTotal
    }

    return {subTotal, allTotal, deliveryChrg}

  }

  getProduct(id: string): Products{

    let index = this.productsArr.findIndex(p => p.id === id)

    return this.productsArr[index]

  }

  productBuy(){
    //add products to order history of user and remove from cart...
    let localEmail = localStorage.getItem("email");

    let userIndex = this.usersArr.findIndex(u => u.email === localEmail)

    for(let prod of this.usersArr[userIndex].cart){
      let tempProdId = prod.product.id
      let tempProdName = prod.product.name
      let tempProdPrice = prod.product.price
      let tempProdDesc = prod.product.description
      let tempProdQuantity = prod.count
      let tempOrderProduct = new OrderedProduct(tempProdId, tempProdName, tempProdPrice, tempProdDesc, tempProdQuantity)

      this.usersArr[userIndex].orderedHistory.push(tempOrderProduct)

      //add products to orders of admin...

      let name = this.usersArr[userIndex].name
      let email = this.usersArr[userIndex].email
      let add = this.usersArr[userIndex].address

      let tempAdminOrderBookProd = new AdminOrderBookModel(tempProdId, tempProdName, tempProdPrice, tempProdDesc, tempProdQuantity, name, email, add)

      this.adminOrderArr.push(tempAdminOrderBookProd)
    }

    this.usersArr[userIndex].cart = []


  }

  getUserOrderHistory(): OrderedProduct[]{
    let localEmail = localStorage.getItem("email");

    let userIndex = this.usersArr.findIndex(u => u.email === localEmail)

    return this.usersArr[userIndex].orderedHistory
  }

  userLogout(){
    localStorage.removeItem("email");
  }



  // for route guards...

  checkIfAdminLoggedIn(){
    return !!localStorage.getItem("adminEmail")
  }

  checkIfUserLoggedIn(){
    return !!localStorage.getItem("email")
  }

}
