import { Component, OnInit } from '@angular/core';
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

  constructor(private ecomService: EcommerceService) { }

  ngOnInit(): void {
    this.productsArr = this.ecomService.getProducts();
  }

  onClick(addToCart: HTMLButtonElement) {

    let prodId = addToCart.id
    this.ecomService.addProdToCart(prodId);

  }

}
