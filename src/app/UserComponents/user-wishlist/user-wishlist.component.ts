import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Products } from 'src/app/DataModel/products';
import { EcommerceService } from 'src/app/ecommerce.service';

@Component({
  selector: 'app-user-wishlist',
  templateUrl: './user-wishlist.component.html',
  styleUrls: ['./user-wishlist.component.css']
})
export class UserWishlistComponent implements OnInit {

  wishListArr: Products[] = []

  userId = localStorage.getItem('id')

  showEmptyIcon: boolean = true

  constructor(private ecomService: EcommerceService, private router: Router) { }

  ngOnInit(): void {

    this.wishListArr = []

    this.ecomService.getWishlistArr(this.userId).subscribe((response)=>{
      console.log(response)

      if(response.message.length > 0){
        for(let prod of response.message){
          let id = prod.prodid
          let name = prod.name
          let price = prod.price
          let desc = prod.description

          let wishlistProd = new Products(id,name, price, desc)

          this.wishListArr.push(wishlistProd)

        }

        this.showEmptyIcon = false
      }else{
        this.showEmptyIcon = true
      }
    })

  }

  addToCartClicked(btn: HTMLButtonElement) {

    let prodId = btn.id
    let userId = localStorage.getItem("id")

    this.ecomService.checkIfProdIsAlreadyInCart(userId, prodId).subscribe((response)=>{
      if(response.message.length > 0){
        this.router.navigate(['/user-cart'])
      }else{
        this.ecomService.addProdToCart({userId: userId ,prodId: prodId}).subscribe((response)=>{
        console.log(response)
        this.router.navigate(['/user-cart'])
        })
      }
    })

  }

  removeFormWishClicked(btn: HTMLButtonElement) {
    this.ecomService.removeFromWishlist(this.userId,btn.id).subscribe((response)=>{
      console.log(response)
      this.ngOnInit()
    })
  }

}
