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

  constructor(private fb: FormBuilder, private ecomService: EcommerceService, private router: Router) { }

  registrationForm = this.fb.group({
    email: ["", [Validators.required, Validators.pattern(this.emailRegEx)]],
    name: ["", Validators.required],
    password: ["", [Validators.required, Validators.minLength(4)]]
  })

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      let tempEmail = this.registrationForm.get('email')?.value
      let tempName = this.registrationForm.get('name')?.value
      let tempPass = this.registrationForm.get('password')?.value

      this.ecomService.createNewUser(tempEmail, tempName, tempPass);

      this.router.navigate(['/user-login']);
    }
  }


}
