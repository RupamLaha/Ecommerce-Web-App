import { Component, OnInit } from '@angular/core';
import { EcommerceService } from 'src/app/ecommerce.service';

@Component({
  selector: 'app-seller-profile',
  templateUrl: './seller-profile.component.html',
  styleUrls: ['./seller-profile.component.css']
})
export class SellerProfileComponent implements OnInit {

  shopName: any
  email: any
  address: any
  phone: any

  constructor(private ecomService: EcommerceService) { }

  ngOnInit(): void {

    this.ecomService.adminShowProfile().subscribe((response)=>{
      console.log(response)
      this.shopName = response.message[0].shopname
      this.email = response.message[0].email
      this.address = response.message[0].address
      this.phone = response.message[0].phone
    })

  }

  onAdminLogout() {
    this.ecomService.adminLogout()
  }

}
