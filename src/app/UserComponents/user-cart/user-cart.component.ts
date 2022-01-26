import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { User } from 'src/app/DataModel/UserDataModel/user';
import { EcommerceService } from 'src/app/ecommerce.service';

@Component({
  selector: 'app-user-cart',
  templateUrl: './user-cart.component.html',
  styleUrls: ['./user-cart.component.css']
})
export class UserCartComponent implements OnInit {

  // cartArr = [
  //   {name: "Oppo a", price: "$12", description: "Some text about the mobile.."},
  //   {name: "Oppo b", price: "$13", description: "Some text about the mobile.."},
  //   {name: "Oppo c", price: "$14", description: "Some text about the mobile.."},
  //   {name: "Oppo d", price: "$15", description: "Some text about the mobile.."}
  // ]

  currUser: User | null = null

  cartItemCount: number = 0
  buyBtnVisible: boolean = false

  subTotal = 0
  allTotal = 0
  delivaryChrg = 0

  constructor(private ecomService: EcommerceService) { }

  ngOnInit(): void {
    this.currUser = this.ecomService.getUser();
    let price = this.ecomService.totalCartPrice()
    this.subTotal = price.subTotal
    this.allTotal = price.allTotal
    this.delivaryChrg = price.deliveryChrg
    this.cartItemCount = this.currUser.cart.length

    if(this.cartItemCount !== 0){
      this.buyBtnVisible = true
    }else{
      this.buyBtnVisible = false
    }
  }

  onRemove(remove: HTMLButtonElement){
    this.ecomService.removeFromCart(remove.id)
    console.log("remove clicked");
    this.ngOnInit()
  }

  increDecre(btn: HTMLButtonElement){
    let action = btn.name
    let prodId = btn.id
    this.ecomService.incrementOrDecrement(prodId, action)
    this.ngOnInit()
  }

  onBuy(){
    this.ecomService.productBuy();
    this.ngOnInit()
  }

}
