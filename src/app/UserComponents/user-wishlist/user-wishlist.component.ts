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

  // wishListArr = [
  //   {name: "Oppo a", price: "$12", description: "Some text about the mobile.."},
  //   {name: "Oppo b", price: "$13", description: "Some text about the mobile.."},
  //   {name: "Oppo c", price: "$14", description: "Some text about the mobile.."},
  //   {name: "Oppo d", price: "$15", description: "Some text about the mobile.."},
  //   {name: "Oppo a", price: "$12", description: "Some text about the mobile.."},
  //   {name: "Oppo b", price: "$13", description: "Some text about the mobile.."},
  //   {name: "Oppo c", price: "$14", description: "Some text about the mobile.."},
  //   {name: "Oppo d", price: "$15", description: "Some text about the mobile.."}
  // ]

  wishListArr: Products[] = []

  constructor(private ecomService: EcommerceService, private router: Router) { }

  ngOnInit(): void {
    this.wishListArr = this.ecomService.getWishlistArr()
  }

  addToCartClicked(btn: HTMLButtonElement){
    this.ecomService.addProdToCart(btn.id)
    this.router.navigate(['/user-cart'])
  }

  removeFormWishClicked(btn: HTMLButtonElement){
    this.ecomService.removeFromWishlist(btn.id)
    this.ngOnInit()
  }

}
