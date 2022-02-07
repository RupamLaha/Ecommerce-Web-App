import { Component, OnChanges, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EcommerceService } from 'src/app/ecommerce.service';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})
export class UserRegistrationComponent implements OnInit {

  emailRegEx = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/

  userName: string = "";

  err: any = null;

  constructor(private fb: FormBuilder, private ecomService: EcommerceService, private router: Router) { }

  registrationForm = this.fb.group({
    email: ["", [Validators.required, Validators.pattern(this.emailRegEx)]],
    name: ["", Validators.required],
    password: ["", [Validators.required, Validators.minLength(4)]],
    address: ["", [Validators.required]]
  })

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      this.ecomService.createNewUser(this.registrationForm.value).subscribe((response) => {
        // console.log(response.message.affectedRows)
        console.log(response)

        if(response.code == "success"){
          this.router.navigate(['/user-login']);
        }else if(response.code == 'ER_DUP_ENTRY'){
          this.err = "Email already registered"
        }else{
          this.err = String(response.message.code)
        }

      })

    }
  }


}
