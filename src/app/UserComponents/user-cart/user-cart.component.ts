import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Cart } from 'src/app/DataModel/CartModel/cart';
import { Products } from 'src/app/DataModel/products';
import { User } from 'src/app/DataModel/UserDataModel/user';
import { EcommerceService } from 'src/app/ecommerce.service';

@Component({
  selector: 'app-user-cart',
  templateUrl: './user-cart.component.html',
  styleUrls: ['./user-cart.component.css']
})
export class UserCartComponent implements OnInit {

  // currUser: User | null = null

  cartArr: Cart[] = []
  userId = localStorage.getItem('id')

  cartItemCount: number = 0
  buyBtnVisible: boolean = false

  subTotal = 0
  allTotal = 0
  delivaryChrg = 0

  displayStyle = "none";

  constructor(private ecomService: EcommerceService) { }

  ngOnInit(): void {

    this.cartArr = []

    this.ecomService.getCartProducts(this.userId).subscribe((response)=>{
      console.log(response)
      if(response.message.length > 0){
        for(let prod of response.message){
          let id = prod.id
          let name = prod.name
          let desc = prod.description
          let price = prod.price
          let quantity = prod.quantity

          if(quantity == 0){
            this.ecomService.removeFromCart(this.userId, id).subscribe((response)=>{
              this.ngOnInit()
            })
          }

          let products = new Products(id,name,price,desc)
          let cartProd = new Cart(products, quantity)
          this.cartArr.push(cartProd)
        }
        
        this.buyBtnVisible = true


        this.subTotal = this.totalPrice()

        if(this.subTotal>0){
          this.delivaryChrg = 5
        }else{
          this.delivaryChrg = 0
        }

        this.allTotal = this.subTotal + this.delivaryChrg

      }else if(response.message.length == 0){
        this.buyBtnVisible = false
      }
    })

    


  }

  totalPrice(): number{
    var total = 0

    for(let prod of this.cartArr){

      total = total + (prod.product.price * prod.count)
    }

    return total
  }

  onRemove(remove: HTMLButtonElement) {

    this.ecomService.removeFromCart(this.userId, remove.id).subscribe((response)=>{
      console.log(response)
      this.ngOnInit()

      this.subTotal = this.totalPrice()

      if(this.subTotal>0){
        this.delivaryChrg = 5
      }else{
        this.delivaryChrg = 0
      }

      this.allTotal = this.subTotal + this.delivaryChrg
    })
    console.log("remove clicked");
  }

  increDecre(btn: HTMLButtonElement) {
    let action = btn.name
    let prodId = btn.id
    this.ecomService.incrementOrDecrement({userId: this.userId, prodId: prodId} , action).subscribe((response)=>{
      console.log(response)

      this.ngOnInit()
    })
    // this.ngOnInit()
  }

  onBuy() {

    let prodCntInCart = this.cartArr.length
    
    for(let prod of this.cartArr){


      let prodId = prod.product.id
      let userId = this.userId
      let quantity = prod.count
      this.ecomService.productBuy({userId:userId, prodId:prodId, quantity: quantity}).subscribe((response)=>{
        console.log(response)
      })

      this.ecomService.removeFromCart(userId,prodId).subscribe((response)=>{
        console.log(response)

        this.ngOnInit()
        this.displayStyle = "block";

        this.subTotal = this.totalPrice()

        if(this.subTotal>0){
          this.delivaryChrg = 5
        }else{
          this.delivaryChrg = 0
        }

        this.allTotal = this.subTotal + this.delivaryChrg

      })
    }

  }

  closePopup() {
    this.displayStyle = "none";
  }

}
