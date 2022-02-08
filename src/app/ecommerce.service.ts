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

  apiURL = 'http://localhost:3000'

  constructor(private http: HttpClient) {
  }

  //admin functions..

  adminLogin(data: any): Observable<any> {

    console.log({FormData: data});

    return this.http.post(`${this.apiURL}/admin/login`,data)

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

    console.log({FormData: data});

    return this.http.post(`${this.apiURL}/admin/products/add`,data)
    
  }

  getAdminProducts(): Observable<any> {
    return this.http.get(`${this.apiURL}/admin/products`)
  }

  adminDeleteProduct(data: any): Observable<any>{

    console.log({FormData: data});

    return this.http.delete(`${this.apiURL}/admin/products/delete/${data}`)
  }

  adminEditProductReq(data: any): Observable<any> {

    console.log({FormData: data});

    return this.http.get(`${this.apiURL}/admin/products/id/${data}`)

  }

  adminUpdateProduct(data: any): Observable<any>{

    console.log({FormData: data});

    return this.http.put(`${this.apiURL}/admin/products/edit`,data)

  }

  getAdminOrderBook(): Observable<any> {
    
    return this.http.get(`${this.apiURL}/admin/orders`)
  }

  adminUpdateOrderStatus(orderId:any, status: any): Observable<any> {

    let data = {orderId: orderId, status: status}

    return this.http.put(`${this.apiURL}/admin/orders/update-status`,data)

  }


  // user functions...

  createNewUser(data: any): Observable<any>{

    console.log({FormData: data});


    return this.http.post(`${this.apiURL}/user/registration`,data)


  }

  loginVerify(data: any): Observable<any> {

    console.log({FormData: data});

    return this.http.post(`${this.apiURL}/user/login`,data)

  }

  getUserProducts(): Observable<any> {
    return this.http.get(`${this.apiURL}/user/products`)
  }

  userShowProfile(userId: any): Observable<any>{

    return this.http.get(`${this.apiURL}/user/profile/${userId}`)

  }

  addToWishlist(data: any): Observable<any> {

    return this.http.post(`${this.apiURL}/user/wishlist/add`,data)

  }

  removeFromWishlist(userId: any, prodId: any) {

    // /user/wishlist/remove

    return this.http.delete(`${this.apiURL}/user/wishlist/remove/${userId}/${prodId}`)

  }

  getWishlistArr(userId: any): Observable<any> {

    return this.http.get(`${this.apiURL}/user/wishlist/${userId}`)

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

  }


  getProduct(prodId: any): Observable<any> {

    return this.http.get(`${this.apiURL}/user/products/${prodId}`)

  }

  productBuy(data:any): Observable<any> {

    return this.http.post(`${this.apiURL}/user/order-history/add`,data)


  }

  getUserOrderHistory(userId: any): Observable<any> {

    return this.http.get(`${this.apiURL}/user/order-history/${userId}`)

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
