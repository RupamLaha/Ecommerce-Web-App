import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserCartComponent } from './UserComponents/user-cart/user-cart.component';
import { UserHomeComponent } from './UserComponents/user-home/user-home.component';
import { UserLoginComponent } from './UserComponents/user-login/user-login.component';
import { UserProductDetailComponent } from './UserComponents/user-product-detail/user-product-detail.component';
import { UserRegistrationComponent } from './UserComponents/user-registration/user-registration.component';
import { UserWishlistComponent } from './UserComponents/user-wishlist/user-wishlist.component';

const routes: Routes = [
  {path: 'user-login', component: UserLoginComponent},
  {path: 'user-registration', component: UserRegistrationComponent},
  {path: 'user-home', component: UserHomeComponent},
  {path: 'user-product-detail', component: UserProductDetailComponent},
  {path: 'user-wishlist', component: UserWishlistComponent},
  {path: 'user-cart', component: UserCartComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
