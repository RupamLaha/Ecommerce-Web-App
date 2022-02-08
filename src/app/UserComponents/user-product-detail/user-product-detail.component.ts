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

  userId = localStorage.getItem('id')

  alreadyWishlistBtn = true

  productId: string | null = null

  product: Products | null = null

  // userWishlistArr: Products[] = []

  wishlistBtnShow: boolean = true

  constructor(private activatedRoute: ActivatedRoute, private ecomService: EcommerceService, private router: Router) { }

  ngOnInit(): void {

    this.productId = this.activatedRoute.snapshot.paramMap.get('id')

    if (this.productId !== null) {
      
      this.ecomService.getProduct(this.productId).subscribe((respond)=>{
        console.log(respond)

        let id = respond.message[0].id
        let name = respond.message[0].name
        let price = respond.message[0].price
        let description = respond.message[0].description

        this.product = new Products(id, name, price, description)

        this.checkProdIfInWishlist()

      })
    }
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

  addToWishClicked(btn: HTMLButtonElement) {

    let prodId = btn.id
    let userId = localStorage.getItem("id")
    this.ecomService.addToWishlist({userId: userId ,prodId: prodId}).subscribe((response)=>{
      console.log(response)
      this.router.navigate(['/user-wishlist'])
    })

  }

  checkProdIfInWishlist() {

    this.ecomService.checkForParticularProdInWishList(this.userId, this.productId).subscribe((response)=>{
      console.log({prodIsPresentOrNot: response})
      if(response.message.length > 0){
        this.wishlistBtnShow = false
      }else{
        this.wishlistBtnShow = true
      }
    })

  }

}
