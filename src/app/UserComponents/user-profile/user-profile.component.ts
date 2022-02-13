import { Component, OnInit } from '@angular/core';
import { EcommerceService } from 'src/app/ecommerce.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  userId = localStorage.getItem('id')

  name: string = ""
  email: string = ""
  address: string = ""

  constructor(private ecoService: EcommerceService) { }

  ngOnInit(): void {

    this.ecoService.userShowProfile(this.userId).subscribe((response)=>{

      console.log(response)

      this.name = response.message[0].name
      this.email = response.message[0].email
      this.address = response.message[0].address

    })
  }

  onLogOut() {
    this.ecoService.userLogout()
  }

}
