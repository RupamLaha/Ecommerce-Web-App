import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http'

import { EcommerceService } from './ecommerce.service';

import { AppComponent } from './app.component';
import { UserLoginComponent } from './UserComponents/user-login/user-login.component';
import { UserRegistrationComponent } from './UserComponents/user-registration/user-registration.component';
import { SellerLoginComponent } from './SellerComponents/seller-login/seller-login.component';
import { SellerRegistrationComponent } from './SellerComponents/seller-registration/seller-registration.component';
import { UserHomeComponent } from './UserComponents/user-home/user-home.component';
import { UserProductDetailComponent } from './UserComponents/user-product-detail/user-product-detail.component';
import { UserWishlistComponent } from './UserComponents/user-wishlist/user-wishlist.component';
import { UserCartComponent } from './UserComponents/user-cart/user-cart.component';
import { UserProfileComponent } from './UserComponents/user-profile/user-profile.component';
import { UserOrderHistoryComponent } from './UserComponents/user-order-history/user-order-history.component';
import { SellerProfileComponent } from './SellerComponents/seller-profile/seller-profile.component';
import { SellerProductsComponent } from './SellerComponents/seller-products/seller-products.component';
import { SellerOrdersComponent } from './SellerComponents/seller-orders/seller-orders.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SellerAddProductComponent } from './SellerComponents/seller-add-product/seller-add-product.component';
import { SellerEditProductComponent } from './SellerComponents/seller-edit-product/seller-edit-product.component';

import { RouteGuardGuard } from './RouteGuard/route-guard.guard';
import { AdminRouteGuard } from './RouteGuard/admin-route.guard';

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
    UserOrderHistoryComponent,
    SellerProfileComponent,
    SellerProductsComponent,
    SellerOrdersComponent,
    PageNotFoundComponent,
    SellerAddProductComponent,
    SellerEditProductComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [EcommerceService, RouteGuardGuard, AdminRouteGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
