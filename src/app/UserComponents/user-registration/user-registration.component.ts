import { Component, OnChanges, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})
export class UserRegistrationComponent implements OnInit {

  emailRegEx = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/

  userName: string = "";

  constructor(private fb: FormBuilder) { }

  registrationForm = this.fb.group({
    email: ["", [Validators.required, Validators.pattern(this.emailRegEx)]],
    name: ["", Validators.required],
    password: ["", [Validators.required, Validators.minLength(4)]]
  })

  ngOnInit(): void {
  }


}
