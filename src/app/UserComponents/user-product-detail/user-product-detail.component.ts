import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Products } from 'src/app/DataModel/products';
import { EcommerceService } from 'src/app/ecommerce.service';

@Component({
  selector: 'app-user-product-detail',
  templateUrl: './user-product-detail.component.html',
  styleUrls: ['./user-product-detail.component.css']
})
export class UserProductDetailComponent implements OnInit {

  productId: string | null = null

  product: Products | null = null

  constructor(private activatedRoute: ActivatedRoute, private ecomService: EcommerceService, private router: Router) { }

  ngOnInit(): void {
    this.productId = this.activatedRoute.snapshot.paramMap.get('id')
    if(this.productId !== null){
      this.product = this.ecomService.getProduct(this.productId)
    }
  }

  addToCartClicked(btn: HTMLButtonElement){
    this.ecomService.addProdToCart(btn.id)
    this.router.navigate(['/user-cart'])
  }

  addToWishClicked(btn: HTMLButtonElement){
    this.ecomService.addToWishlist(btn.id)
    this.router.navigate(['/user-wishlist'])
  }

}
