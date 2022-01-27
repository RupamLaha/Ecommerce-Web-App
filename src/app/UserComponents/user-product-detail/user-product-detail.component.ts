import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Products } from 'src/app/DataModel/products';
import { EcommerceService } from 'src/app/ecommerce.service';

@Component({
  selector: 'app-user-product-detail',
  templateUrl: './user-product-detail.component.html',
  styleUrls: ['./user-product-detail.component.css']
})
export class UserProductDetailComponent implements OnInit {

  alreadyWishlistBtn = true

  productId: string | null = null

  product: Products | null = null

  userWishlistArr: Products[] = []

  wishlistBtnShow: boolean = true

  constructor(private activatedRoute: ActivatedRoute, private ecomService: EcommerceService, private router: Router) { }

  ngOnInit(): void {

    this.userWishlistArr = this.ecomService.getWishlistArr()

    // this.activatedRoute.paramMap.subscribe((param: ParamMap) =>
    // {
    //   this.productId = param.get('id')
    // })

    this.productId = this.activatedRoute.snapshot.paramMap.get('id')

    this.checkProdIfInWishlist()

    if (this.productId !== null) {
      this.product = this.ecomService.getProduct(this.productId)
    }
  }

  addToCartClicked(btn: HTMLButtonElement) {
    this.ecomService.addProdToCart(btn.id)
    this.router.navigate(['/user-cart'])
  }

  addToWishClicked(btn: HTMLButtonElement) {
    this.ecomService.addToWishlist(btn.id)
    this.ngOnInit()
    this.router.navigate(['/user-wishlist'])
  }

  checkProdIfInWishlist() {

    let tempId = this.userWishlistArr.findIndex(p => p.id === this.productId)

    if (tempId == -1) {
      this.wishlistBtnShow = true
    } else {
      this.wishlistBtnShow = false
    }

  }

}
