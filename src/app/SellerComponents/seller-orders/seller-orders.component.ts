
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AdminOrderBookModel } from 'src/app/DataModel/AdminOrderBookModel/admin-order-book-model';
import { EcommerceService } from 'src/app/ecommerce.service';

@Component({
  selector: 'app-seller-orders',
  templateUrl: './seller-orders.component.html',
  styleUrls: ['./seller-orders.component.css']
})
export class SellerOrdersComponent implements OnInit {

  // contactForm:FormGroup;

  adminOderBook: AdminOrderBookModel[] = [] 

  showEmptyIcon: boolean = true

  // orderStatusUpdate = "null"

  constructor(private ecomService: EcommerceService, private fb:FormBuilder) { }

  contactForm = this.fb.group({
    orderStatus: ["null"]
  });


  ngOnInit(): void {

    this.adminOderBook = this.ecomService.getAdminOrderBook()

    if(this.adminOderBook.length === 0){
      this.showEmptyIcon = true
    }else{
      this.showEmptyIcon = false
    }

    // this.contactForm.setValue({
    //   orderStatus: this.orderStatusUpdate
    // })
  }

  submit(buyeremail: string, prodId: string){
    console.log("Submitted")
    console.log(this.contactForm.value)

    let status = this.contactForm.get('orderStatus')?.value.toString()

    console.log(status)

    this.ecomService.adminUpdateOrderStatus(buyeremail, status, prodId)

    // this.orderStatusUpdate = status

    // this.contactForm.setValue({
    //   orderStatus: this.orderStatusUpdate
    // })

    // console.log(this.contactForm.value)
    // console.log(this.contactForm.get('orderStatus')?.value)
    
    // this.ngOnInit()
  }
}
