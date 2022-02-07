import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Products } from 'src/app/DataModel/products';
import { EcommerceService } from 'src/app/ecommerce.service';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent implements OnInit {

  // productsArr = [
  //   {name: "Oppo a", price: "$12", description: "Some text about the mobile.."},
  //   {name: "Oppo b", price: "$13", description: "Some text about the mobile.."},
  //   {name: "Oppo c", price: "$14", description: "Some text about the mobile.."},
  //   {name: "Oppo d", price: "$15", description: "Some text about the mobile.."},
  //   {name: "Oppo a", price: "$12", description: "Some text about the mobile.."},
  //   {name: "Oppo b", price: "$13", description: "Some text about the mobile.."},
  //   {name: "Oppo c", price: "$14", description: "Some text about the mobile.."},
  //   {name: "Oppo d", price: "$15", description: "Some text about the mobile.."}
  // ]

  productsArr: Products[] = []

  constructor(private ecomService: EcommerceService, private router: Router) { }

  ngOnInit(): void {
    // this.productsArr = this.ecomService.getProducts();
    // this.ecomService.getUserProducts().subscribe((response)=>{
    //   console.log(response)
    // })

    this.productsArr = []

    this.ecomService.getUserProducts().subscribe((response)=>{
      console.log(response)
      if(response.message.length > 0){
        for(let prod of response.message){
          let id = prod.id
          let name = prod.name
          let desc = prod.description
          let price = prod.price

          let products = new Products(id,name,price,desc)

          this.productsArr.push(products)

        }
      }else if(response.message.length == 0){
        // this.showEmptyIcon = true
      }
    })
  }

  onClick(addToCart: HTMLButtonElement) {

    let prodId = addToCart.id
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

}
