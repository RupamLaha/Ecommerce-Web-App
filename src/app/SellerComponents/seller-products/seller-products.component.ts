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

  showEmptyIcon: boolean = true

  constructor(private ecomService: EcommerceService, private router: Router) { }

  ngOnInit(): void {
    this.adminProductsArr = this.ecomService.getProducts();

    if (this.adminProductsArr.length === 0) {
      this.showEmptyIcon = true
    } else {
      this.showEmptyIcon = false
    }
  }

  editProduct(editBtn: HTMLButtonElement) {
    console.log(editBtn.id);
    this.router.navigate(['/seller-edit-product', editBtn.id]);
  }

  removeProduct(removeBtn: HTMLButtonElement) {
    console.log(removeBtn.id);
    this.ecomService.adminDeleteProduct(removeBtn.id);
    this.ngOnInit()
  }

}
