import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EcommerceService } from 'src/app/ecommerce.service';

@Component({
  selector: 'app-seller-login',
  templateUrl: './seller-login.component.html',
  styleUrls: ['./seller-login.component.css']
})
export class SellerLoginComponent implements OnInit {

  emailRegEx = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/

  err: any;

  constructor(private fb: FormBuilder, private ecomService: EcommerceService, private router: Router) { }

  loginForm = this.fb.group({
    email: ["", [Validators.required, Validators.pattern(this.emailRegEx)]],
    password: ["", [Validators.required, Validators.minLength(4)]]
  })

  ngOnInit(): void {
  }

  onLogIn() {
  //   let email = this.loginForm.get('email')?.value
  //   let pass = this.loginForm.get('password')?.value

  //   if (this.ecomService.adminLogin(email, pass)) {
  //     this.router.navigate(['seller-orders'])
  //   }
  // }

  this.ecomService.adminLogin(this.loginForm.value).subscribe((response) => {
    console.log(response)
    console.log(response.message.length)

    if(response.message.length == 1){
      this.err = null
      localStorage.setItem("adminId", response.message[0].id)
      localStorage.setItem("adminEmail", response.message[0].email)
      localStorage.setItem("adminRole", response.message[0].role)
      console.log('login success')
      this.router.navigate(['seller-orders']);

    }else{
      console.log('login failed')
      this.err = "Login failed! Wrong Credentials"
    }
  })

  }
}