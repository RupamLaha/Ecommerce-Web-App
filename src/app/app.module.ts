import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserLoginComponent } from './UserComponents/user-login/user-login.component';
import { UserRegistrationComponent } from './UserComponents/user-registration/user-registration.component';
import { SellerLoginComponent } from './SellerComponents/seller-login/seller-login.component';
import { SellerRegistrationComponent } from './SellerComponents/seller-registration/seller-registration.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserHomeComponent } from './UserComponents/user-home/user-home.component';
import { UserProductDetailComponent } from './UserComponents/user-product-detail/user-product-detail.component';
import { UserWishlistComponent } from './UserComponents/user-wishlist/user-wishlist.component';
import { UserCartComponent } from './UserComponents/user-cart/user-cart.component';
import { UserProfileComponent } from './UserComponents/user-profile/user-profile.component';
import { UserOrderHistoryComponent } from './UserComponents/user-order-history/user-order-history.component';

@NgModule({
  declarations: [
    AppComponent,
    UserLoginComponent,
    UserRegistrationComponent,
    SellerLoginComponent,
    SellerRegistrationComponent,
    UserHomeComponent,
    UserProductDetailComponent,
    UserWishlistComponent,
    UserCartComponent,
    UserProfileComponent,
    UserOrderHistoryComponent
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
