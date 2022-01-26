import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SellerAddProductComponent } from './SellerComponents/seller-add-product/seller-add-product.component';
import { SellerEditProductComponent } from './SellerComponents/seller-edit-product/seller-edit-product.component';
import { SellerLoginComponent } from './SellerComponents/seller-login/seller-login.component';
import { SellerOrdersComponent } from './SellerComponents/seller-orders/seller-orders.component';
import { SellerProductsComponent } from './SellerComponents/seller-products/seller-products.component';
import { SellerProfileComponent } from './SellerComponents/seller-profile/seller-profile.component';
import { SellerRegistrationComponent } from './SellerComponents/seller-registration/seller-registration.component';
import { UserCartComponent } from './UserComponents/user-cart/user-cart.component';
import { UserHomeComponent } from './UserComponents/user-home/user-home.component';
import { UserLoginComponent } from './UserComponents/user-login/user-login.component';
import { UserOrderHistoryComponent } from './UserComponents/user-order-history/user-order-history.component';
import { UserProductDetailComponent } from './UserComponents/user-product-detail/user-product-detail.component';
import { UserProfileComponent } from './UserComponents/user-profile/user-profile.component';
import { UserRegistrationComponent } from './UserComponents/user-registration/user-registration.component';
import { UserWishlistComponent } from './UserComponents/user-wishlist/user-wishlist.component';

const routes: Routes = [
  {path: 'user-login', component: UserLoginComponent},
  {path: 'user-registration', component: UserRegistrationComponent},
  {path: 'user-home', component: UserHomeComponent},
  {path: 'user-product-detail/:id', component: UserProductDetailComponent},
  {path: 'user-wishlist', component: UserWishlistComponent},
  {path: 'user-cart', component: UserCartComponent},
  {path: 'user-profile', component: UserProfileComponent},
  {path: 'user-order-history', component: UserOrderHistoryComponent},
  {path: 'seller-login', component: SellerLoginComponent},
  {path: 'seller-registration', component: SellerRegistrationComponent},
  {path: 'seller-profile', component: SellerProfileComponent},
  {path: 'seller-products', component: SellerProductsComponent},
  {path: 'seller-orders', component: SellerOrdersComponent},
  {path: 'seller-add-product', component: SellerAddProductComponent},
  {path: 'seller-edit-product/:id', component: SellerEditProductComponent},
  {path: '', redirectTo: "/user-login", pathMatch: "full"},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
