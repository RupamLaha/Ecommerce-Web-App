import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserLoginComponent } from './UserComponents/user-login/user-login.component';
import { UserRegistrationComponent } from './UserComponents/user-registration/user-registration.component';
import { SellerLoginComponent } from './SellerComponents/seller-login/seller-login.component';
import { SellerRegistrationComponent } from './SellerComponents/seller-registration/seller-registration.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    UserLoginComponent,
    UserRegistrationComponent,
    SellerLoginComponent,
    SellerRegistrationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
