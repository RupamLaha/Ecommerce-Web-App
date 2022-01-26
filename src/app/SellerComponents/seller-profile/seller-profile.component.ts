import { Component, OnInit } from '@angular/core';
import { EcommerceService } from 'src/app/ecommerce.service';

@Component({
  selector: 'app-seller-profile',
  templateUrl: './seller-profile.component.html',
  styleUrls: ['./seller-profile.component.css']
})
export class SellerProfileComponent implements OnInit {

  constructor(private ecomService: EcommerceService) { }

  ngOnInit(): void {
  }

  onAdminLogout(){
    this.ecomService.adminLogout()
  }

}
