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

  constructor(private fb: FormBuilder, private ecomService: EcommerceService, private router: Router) { }

  newProductAddingForm = this.fb.group({
    id: ["", Validators.required],
    name: ["", Validators.required],
    price: ["", Validators.required],
    description: ["", Validators.required]
  })

  onSubmit(){
    if(this.newProductAddingForm.valid){
      console.log(this.newProductAddingForm.value);
      var tempProd: Products = this.newProductAddingForm.value;
      this.ecomService.adminAddProducts(tempProd.id, tempProd.name, tempProd.price, tempProd.description);

      this.newProductAddingForm.setValue({
        id: "",
        name: "",
        price: null,
        description: ""
      })

      this.newProductAddingForm.markAsUntouched()

      this.router.navigate(['/seller-add-product']);

    }else{
      alert("Invalid product")
    }
  }

  ngOnInit(): void {
  }

}
