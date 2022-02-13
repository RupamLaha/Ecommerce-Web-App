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
  alertType: any;
  errMsg: any;

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

    let _id = this.activatedRoute.snapshot.paramMap.get('id');

    console.log("paramMap id = " + _id);

    if (_id != null) {

      this.ecomService.adminEditProductReq(_id).subscribe((response)=>{

        if(response.message.length == 1){

          this.newProductAddingForm.setValue({
            id: response.message[0].id,
            name: response.message[0].name,
            price: response.message[0].price,
            description: response.message[0].description
          })
        }

        console.log(response)


      })

    }
  }

  onSubmit() {

    let id = this.newProductAddingForm.get('id')?.value
    let name = this.newProductAddingForm.get('name')?.value
    let price = this.newProductAddingForm.get('price')?.value
    let desc = this.newProductAddingForm.get('description')?.value

    this.ecomService.adminUpdateProduct(this.newProductAddingForm.value).subscribe((response)=>{
      console.log(response)
      if(response.message.affectedRows == 1){
        this.alertType = 'succcess'
        this.displayStyle = "block";
        this.errMsg = "Product successfully edited"
        this.router.navigate(['/seller-products']);
      }else{
        this.alertType = 'danger'
        this.displayStyle = "block";
        this.errMsg = response.code
      }
    })
  }

}
