import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Products } from 'src/app/DataModel/products';
import { EcommerceService } from 'src/app/ecommerce.service';

@Component({
  selector: 'app-seller-products',
  templateUrl: './seller-products.component.html',
  styleUrls: ['./seller-products.component.css']
})
export class SellerProductsComponent implements OnInit {

  adminProductsArr: Products[] = []

  showEmptyIcon: any;

  constructor(private ecomService: EcommerceService, private router: Router) { }

  ngOnInit(): void {

    this.adminProductsArr = []

    this.ecomService.getAdminProducts().subscribe((response)=>{
      console.log(response)
      if(response.message.length > 0){
        for(let prod of response.message){
          let id = prod.id
          let name = prod.name
          let desc = prod.description
          let price = prod.price

          let products = new Products(id,name,price,desc)

          this.adminProductsArr.push(products)

          this.showEmptyIcon = false
        }
      }else if(response.message.length == 0){
        this.showEmptyIcon = true
      }
    })

    console.log(this.adminProductsArr.length)

  }

  editProduct(editBtn: HTMLButtonElement) {
    console.log(editBtn.id);
    this.router.navigate(['/seller-edit-product', editBtn.id]);
  }

  removeProduct(removeBtn: HTMLButtonElement) {
    console.log(removeBtn.id);
    this.ecomService.adminDeleteProduct(removeBtn.id).subscribe((response)=>{
      console.log(response)
      this.ngOnInit()
    })
  }

}
