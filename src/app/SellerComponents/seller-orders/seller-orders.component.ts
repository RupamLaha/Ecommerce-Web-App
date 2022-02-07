
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

  constructor(private ecomService: EcommerceService, private fb: FormBuilder) { }

  contactForm = this.fb.group({
    orderStatus: ["null"]
  });


  ngOnInit(): void {

    // id, name, price, description, orderStatus, quantity, buyerName, buyerEmail, buyerAdd

    this.adminOderBook = []

    this.ecomService.getAdminOrderBook().subscribe((response)=>{
      console.log(response)

      if(response.message.length > 0){
        for(let prod of response.message){

          let orderId = prod.orderId
          let id = prod.prodid
          let name = prod.pname
          let price = prod.price
          let description = prod.description
          let orderStatus = prod.orderstatus
          let quantity = prod.quantity
          let buyerName = prod.uname
          let buyerEmail = prod.email
          let buyerAdd = prod.address
  
          let orderProd = new AdminOrderBookModel(id, name, price, description, orderStatus, quantity, buyerName, buyerEmail, buyerAdd, orderId)
  
          this.adminOderBook.push(orderProd)
        }
          this.showEmptyIcon = false
      }else{
        this.showEmptyIcon = true
      }
    })

    // if (this.adminOderBook.length === 0) {
    //   this.showEmptyIcon = true
    // } else {
    //   this.showEmptyIcon = false
    // }

  }

  submit(orderId: any) {
    // console.log("Submitted")
    // console.log(this.contactForm.value)

    let status = this.contactForm.get('orderStatus')?.value

    // console.log(this.contactForm.get('orderStatus')?.value)

    // console.log(status)

    this.ecomService.adminUpdateOrderStatus(orderId, status).subscribe((response)=>{
      console.log(response)
      this.ngOnInit()
    })

  }
}
