import { Component, OnInit } from '@angular/core';
import { EcommerceService } from 'src/app/ecommerce.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  name: string = ""
  email: string = ""
  address: string = ""

  constructor(private ecoService: EcommerceService) { }

  ngOnInit(): void {
    this.name = this.ecoService.getUser().name
    this.email = this.ecoService.getUser().email
    this.address = this.ecoService.getUser().address
  }

  onLogOut() {
    this.ecoService.userLogout()
  }

}
