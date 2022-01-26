import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Products } from 'src/app/DataModel/products';
import { EcommerceService } from 'src/app/ecommerce.service';

@Component({
  selector: 'app-seller-edit-product',
  templateUrl: './seller-edit-product.component.html',
  styleUrls: ['./seller-edit-product.component.css']
})
export class SellerEditProductComponent implements OnInit {

  // adminProductsArr: Products[] = []

  // currentProduct: Products;

  displayStyle = "none";

  constructor(private fb: FormBuilder, private ecomService: EcommerceService, private router: Router, private activatedRoute: ActivatedRoute) { }

  prodIdRegx = /^[0-9]*$/
  nameRegx = /^[a-zA-Z ]*$/

  newProductAddingForm = this.fb.group({
    id: [""],
    name: ["", [Validators.required, Validators.pattern(this.nameRegx)]],
    price: ["", [Validators.required, Validators.pattern(this.prodIdRegx)]],
    description: ["", [Validators.required, Validators.pattern(this.nameRegx)]]
  })

  ngOnInit(): void {
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    console.log("paramMap id = " + id);
    if(id != null){
      let currentProduct = this.ecomService.adminEditProductReq(id);

      this.newProductAddingForm.setValue({
        id: currentProduct.id,
        name: currentProduct.name,
        price: currentProduct.price,
        description: currentProduct.description
      })
    }
  }

  onSubmit(){
    // console.log('Subit button clicked');

    let id = this.newProductAddingForm.get('id')?.value
    let name = this.newProductAddingForm.get('name')?.value
    let price = this.newProductAddingForm.get('price')?.value
    let desc = this.newProductAddingForm.get('description')?.value

    this.ecomService.adminUpdateProduct(id, name, price, desc);

    this.newProductAddingForm.setValue({
      id: "",
      name: "",
      price: null,
      description: ""
    })

    this.newProductAddingForm.markAsUntouched()

    this.router.navigate(['/seller-products']);

    this.displayStyle = "block";
  }

}
