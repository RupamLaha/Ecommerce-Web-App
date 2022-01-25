import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.css']
})
export class SellerAddProductComponent implements OnInit {



  constructor(private fb: FormBuilder) { }

  newProductAddingForm = this.fb.group({
    id: ["", Validators.required],
    name: ["", Validators.required],
    price: ["", Validators.required],
    description: ["", Validators.required]
  })

  ngOnInit(): void {
  }

}
