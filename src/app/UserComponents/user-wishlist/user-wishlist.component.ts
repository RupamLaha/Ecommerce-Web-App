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

  showEmptyIcon: boolean = true

  constructor(private ecomService: EcommerceService, private router: Router) { }

  ngOnInit(): void {
    this.wishListArr = this.ecomService.getWishlistArr()

    if (this.wishListArr.length === 0) {
      this.showEmptyIcon = true
    } else {
      this.showEmptyIcon = false
    }
  }

  addToCartClicked(btn: HTMLButtonElement) {
    this.ecomService.addProdToCart(btn.id)
    this.router.navigate(['/user-cart'])
  }

  removeFormWishClicked(btn: HTMLButtonElement) {
    this.ecomService.removeFromWishlist(btn.id)
    this.ngOnInit()
  }

}
