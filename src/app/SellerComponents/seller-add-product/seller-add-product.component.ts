import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Products } from 'src/app/DataModel/products';
import { EcommerceService } from 'src/app/ecommerce.service';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.css']
})
export class SellerAddProductComponent implements OnInit {

  adminProductsArr: Products[] = []

  displayStyle = "none";
  msgAfterSubmit: any;
  alertType : any;

  constructor(private fb: FormBuilder, private ecomService: EcommerceService, private router: Router) { }

  prodIdRegx = /^[0-9]*$/
  nameRegx = /^[a-zA-Z ]*$/

  newProductAddingForm = this.fb.group({
    // id: ["", [Validators.required, Validators.pattern(this.prodIdRegx)]],
    name: ["", [Validators.required, Validators.pattern(this.nameRegx)]],
    price: ["", [Validators.required, Validators.pattern(this.prodIdRegx)]],
    description: ["", [Validators.required, Validators.pattern(this.nameRegx)]]
  })

  onSubmit() {
    if (this.newProductAddingForm.valid) {

      this.ecomService.adminAddProducts(this.newProductAddingForm.value).subscribe((response)=>{
        console.log(response)
        if(response.code == "success"){
          if(response.message.affectedRows == 1){
            this.newProductAddingForm.reset()
            this.newProductAddingForm.markAsUntouched()
            this.msgAfterSubmit = 'Product successfully added.'
            this.displayStyle = "block";
            this.alertType = 'success'
          }else if(response.message.affectedRows == 0){
            this.msgAfterSubmit = 'Oops something went wrong. Try again'
            this.displayStyle = "block";
            this.alertType = 'warning'
          }else{
            this.msgAfterSubmit = 'Oops something went wrong. Try again'
            this.displayStyle = "block";
            this.alertType = 'warning'
          }
        }else{
          this.msgAfterSubmit = response.message
            this.displayStyle = "block";
            this.alertType = 'warning'
        }
        
      })

    } else {
      alert("Invalid product")
    }

    // this.displayStyle = "block";
  }

  ngOnInit(): void {
  }

}