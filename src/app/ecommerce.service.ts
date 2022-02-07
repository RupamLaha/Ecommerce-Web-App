import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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

  apiURL = 'http://localhost:3000'

  constructor(private http: HttpClient) {
    console.log(this.productsArr);
    // console.log(this.usersArr);
  }

  //admin functions..

  adminLogin(data: any): Observable<any> {

    console.log({FormData: data});

    return this.http.post(`${this.apiURL}/admin/login`,data)

    // if (email === "laha@gmail.com") {
    //   if (pass === "1234") {
    //     localStorage.setItem("adminEmail", email)
    //     return true
    //   } else {
    //     alert("Incorrect password!")
    //     return false
    //   }
    // } else {
    //   alert("User not found!")
    //   return false
    // }
  }

  adminLogout() {
    localStorage.removeItem("adminId")
    localStorage.removeItem("adminEmail")
    localStorage.removeItem("adminRole")
  }

  adminShowProfile(): Observable<any>{

    return this.http.get(`${this.apiURL}/admin/profile`)

  }

  adminAddProducts(data: any): Observable<any>{
    // var tempProd = new Products(id, name, price, description);
    // this.productsArr.push(tempProd);
    // console.log(this.productsArr);
    console.log({FormData: data});

    return this.http.post(`${this.apiURL}/admin/products/add`,data)
    
  }

  getAdminProducts(): Observable<any> {
    return this.http.get(`${this.apiURL}/admin/products`)
  }

  adminDeleteProduct(data: any): Observable<any>{
    // var index = this.productsArr.findIndex(p => p.id === id)
    // this.productsArr.splice(index, 1);
    // console.log(index);

    console.log({FormData: data});

    return this.http.delete(`${this.apiURL}/admin/products/delete/${data}`)
  }

  adminEditProductReq(data: any): Observable<any> {
    // var index = this.productsArr.findIndex(p => p.id === id)
    // return this.productsArr[index]
    // console.log(index);

    console.log({FormData: data});

    return this.http.get(`${this.apiURL}/admin/products/id/${data}`)

  }

  adminUpdateProduct(data: any): Observable<any>{
    // var index = this.productsArr.findIndex(p => p.id === id)

    // this.productsArr[index].name = name
    // this.productsArr[index].price = price
    // this.productsArr[index].description = desc

    console.log({FormData: data});

    return this.http.put(`${this.apiURL}/admin/products/edit`,data)

    // console.log(index);
  }

  getAdminOrderBook(): Observable<any> {
    // return this.adminOrderArr
    return this.http.get(`${this.apiURL}/admin/orders`)
  }

  adminUpdateOrderStatus(orderId:any, status: any): Observable<any> {

    let data = {orderId: orderId, status: status}

    return this.http.put(`${this.apiURL}/admin/orders/update-status`,data)

    //making chang in the user order history arr..
    // let index = this.usersArr.findIndex(u => u.email === buyeremail)

    // let prodIndex = this.usersArr[index].orderedHistory.findIndex(p => p.id === prodId)

    // if (status === "Shipped") {
    //   this.usersArr[index].orderedHistory[prodIndex].orderStatus = OrderStatus.Shipped
    // } else {
    //   this.usersArr[index].orderedHistory[prodIndex].orderStatus = OrderStatus.Pending
    // }

    // //making change in the adminOrder arr....
    // let adminProdIndex = this.adminOrderArr.findIndex(p => p.id === prodId)

    // if (status === "Shipped") {
    //   this.adminOrderArr[adminProdIndex].orderStatus = OrderStatus.Shipped
    // } else {
    //   this.adminOrderArr[adminProdIndex].orderStatus = OrderStatus.Pending
    // }
  }


  // user functions...

  createNewUser(data: any): Observable<any>{
    // let newUser = new User(email, name, password);

    // this.usersArr.push(newUser);

    console.log({FormData: data});


    return this.http.post(`${this.apiURL}/user/registration`,data)


  }

  loginVerify(data: any): Observable<any> {

    console.log({FormData: data});

    return this.http.post(`${this.apiURL}/user/login`,data)

    // var index = this.usersArr.findIndex(u => u.email === email)
    // console.log(index);
    // if (index !== -1) {
    //   if (this.usersArr[index].email === email && this.usersArr[index].password === pass) {
        // localStorage.setItem("email", email);
    //     return true;
    //   } else {
    //     alert("Wrong Password");
    //     console.log("Wrong Password");
    //     return false;
    //   }
    // } else {
    //   alert("User not registured");
    //   console.log("User not registured");
    //   return false;
    // }
  }

  getUserProducts(): Observable<any> {
    return this.http.get(`${this.apiURL}/user/products`)
  }

  getUser(): User {

    let localEmail = localStorage.getItem("email");

    let userIndex = this.usersArr.findIndex(u => u.email === localEmail)

    return this.usersArr[userIndex]

  }

  userShowProfile(userId: any): Observable<any>{

    return this.http.get(`${this.apiURL}/user/profile/${userId}`)

  }

  addToWishlist(data: any): Observable<any> {

    return this.http.post(`${this.apiURL}/user/wishlist/add`,data)


    // let index = this.productsArr.findIndex(p => p.id === prodId)

    // let tempProd: Products = this.productsArr[index]

    // let localEmail = localStorage.getItem("email");

    // let userIndex = this.usersArr.findIndex(u => u.email === localEmail)

    // //checking whether this product already exists in the cart or not..
    // let duplicateProdIndex = this.usersArr[userIndex].wishlist.findIndex(p => p.id === prodId)

    // if (duplicateProdIndex === -1) {
    //   this.usersArr[userIndex].wishlist.push(tempProd);
    // } else {

    // }
  }

  removeFromWishlist(userId: any, prodId: any) {

    // /user/wishlist/remove

    return this.http.delete(`${this.apiURL}/user/wishlist/remove/${userId}/${prodId}`)

    // let localEmail = localStorage.getItem("email");

    // let userIndex = this.usersArr.findIndex(u => u.email === localEmail)

    // //checking whether this product already exists in the cart or not..
    // let prodIndex = this.usersArr[userIndex].wishlist.findIndex(p => p.id === prodId)

    // if (prodIndex !== -1) {
    //   this.usersArr[userIndex].wishlist.splice(prodIndex, 1);
    // } else {

    // }
  }

  getWishlistArr(userId: any): Observable<any> {

    return this.http.get(`${this.apiURL}/user/wishlist/${userId}`)


    // let localEmail = localStorage.getItem("email");

    // let userIndex = this.usersArr.findIndex(u => u.email === localEmail)

    // return this.usersArr[userIndex].wishlist
  }

  checkForParticularProdInWishList(userId: any, prodId: any): Observable<any>{

    return this.http.get(`${this.apiURL}/user/wishlist/${userId}/${prodId}`)
  
  }


  getCartProducts(data: any): Observable<any>{

    console.log({FormData: data});

    return this.http.get(`${this.apiURL}/user/cart/${data}`)
  }

  checkIfProdIsAlreadyInCart(userid : any, prodid : any): Observable<any>{

    return this.http.get(`${this.apiURL}/user/cart/check/${userid}/${prodid}`)

  }

  addProdToCart(data: any): Observable<any>{

    console.log({FormData: data});

    return this.http.post(`${this.apiURL}/user/cart/add`,data)

    // let index = this.productsArr.findIndex(p => p.id === prodId)

    // let tempProd: Products = this.productsArr[index]

    // let tempCartProduct: Cart = new Cart(tempProd)

    // let localEmail = localStorage.getItem("email");

    // let userIndex = this.usersArr.findIndex(u => u.email === localEmail)

    // //checking whether this product already exists in the cart or not..
    // let duplicateProdIndex = this.usersArr[userIndex].cart.findIndex(p => p.product.id === prodId)

    // if (duplicateProdIndex !== -1) {
    //   if (this.usersArr[userIndex].cart[duplicateProdIndex].count === 0) {
    //     this.removeFromCart(prodId)
    //   } else {
    //     this.usersArr[userIndex].cart[duplicateProdIndex].count += 1
    //   }
    // } else {
    //   this.usersArr[userIndex].cart.push(tempCartProduct);
    // }

  }

  incrementOrDecrement(data: any, sign: string): Observable<any> {

    if (sign === '+') {

      console.log({formData : data})

      return this.http.put(`${this.apiURL}/user/cart/prod-quantity-incre`,data)


    } else {

      return this.http.put(`${this.apiURL}/user/cart/prod-quantity-decre`,data)


    }

  }

  removeFromCart(userid: any, prodId: any) {

    return this.http.delete(`${this.apiURL}/user/cart/remove/${userid}/${prodId}`)

    // let userid = localStorage.getItem("id");

    // let userIndex = this.usersArr.findIndex(u => u.email === localEmail)

    // let prodIndexInCartArr = this.usersArr[userIndex].cart.findIndex(p => p.product.id === prodId)

    // console.log(this.usersArr[userIndex].cart)

    // this.usersArr[userIndex].cart.splice(prodIndexInCartArr, 1)

    // console.log(this.usersArr[userIndex].cart)

  }

  totalCartPrice(): { subTotal: number, allTotal: number, deliveryChrg: number } {
    var subTotal = 0
    var deliveryChrg = 0

    let localEmail = localStorage.getItem("email");

    let userIndex = this.usersArr.findIndex(u => u.email === localEmail)

    let cartArr = this.usersArr[userIndex].cart

    for (let cartItem of cartArr) {
      let total = cartItem.product.price * cartItem.count
      subTotal += total
    }

    var allTotal = 0
    if (cartArr.length === 0) {
      allTotal = deliveryChrg + subTotal
    } else {
      deliveryChrg = 5
      allTotal = deliveryChrg + subTotal
    }

    return { subTotal, allTotal, deliveryChrg }

  }

  getProduct(prodId: any): Observable<any> {

    return this.http.get(`${this.apiURL}/user/products/${prodId}`)

    // let index = this.productsArr.findIndex(p => p.id === id)

    // return this.productsArr[index]

  }

  productBuy(data:any): Observable<any> {

    return this.http.post(`${this.apiURL}/user/order-history/add`,data)


  }

  getUserOrderHistory(userId: any): Observable<any> {

    return this.http.get(`${this.apiURL}/user/order-history/${userId}`)

    // let localEmail = localStorage.getItem("email");

    // let userIndex = this.usersArr.findIndex(u => u.email === localEmail)

    // return this.usersArr[userIndex].orderedHistory


  }

  userLogout() {
    localStorage.removeItem("id");
    localStorage.removeItem("email");
    localStorage.removeItem("role");
  }



  // for route guards...

  checkIfAdminLoggedIn() {
    if(localStorage.getItem("adminRole") == 'admin'){
      return !!(localStorage.getItem("adminEmail") && localStorage.getItem("adminId"))
    }else{
      return false
    }
  }

  checkIfUserLoggedIn() {
    if(localStorage.getItem("role") == 'user'){
      return !!(localStorage.getItem("email") && localStorage.getItem("id"))
    }else{
      return false
    }
    
  }

}
