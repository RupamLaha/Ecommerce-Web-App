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

  constructor(private fb: FormBuilder, private ecomService: EcommerceService, private router: Router) { }

  loginForm = this.fb.group({
    email: ["", [Validators.required, Validators.pattern(this.emailRegEx)]],
    password: ["", [Validators.required, Validators.minLength(4)]]
  })

  ngOnInit(): void {
  }

  onLogIn(){
    let email = this.loginForm.get('email')?.value
    let pass = this.loginForm.get('password')?.value

    if(this.ecomService.adminLogin(email, pass)){
      this.router.navigate(['seller-orders'])
    }
  }

}