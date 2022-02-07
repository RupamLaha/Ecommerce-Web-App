import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EcommerceService } from 'src/app/ecommerce.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  emailRegEx = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/

  err: any;

  constructor(private fb: FormBuilder, private ecomService: EcommerceService, private router: Router) { }

  loginForm = this.fb.group({
    email: ["", [Validators.required, Validators.pattern(this.emailRegEx)]],
    password: ["", [Validators.required, Validators.minLength(4)]]
  })

  ngOnInit(): void {
  }

  onSubmit() {
    // let email = this.loginForm.get('email')?.value;
    // let pass = this.loginForm.get('password')?.value;

    // console.log(email);
    // console.log(pass);

    this.ecomService.loginVerify(this.loginForm.value).subscribe((response)=>{
      console.log(response)
      console.log(response.message.length)

      if(response.message.length == 1){
        this.err = null
        localStorage.setItem("id", response.message[0].id)
        localStorage.setItem("email", response.message[0].email)
        localStorage.setItem("role", response.message[0].role)
        console.log('login success')
        this.router.navigate(['/user-home']);

      }else{
        console.log('login failed')
        this.err = "Login failed! Wrong Credentials"
      }
    })

    // if (temp) {
    //   this.router.navigate(['/user-home']);
    // }
  }

}
