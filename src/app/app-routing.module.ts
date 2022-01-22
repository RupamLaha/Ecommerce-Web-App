import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserLoginComponent } from './UserComponents/user-login/user-login.component';
import { UserRegistrationComponent } from './UserComponents/user-registration/user-registration.component';

const routes: Routes = [
  {path: 'user-login', component: UserLoginComponent},
  {path: 'user-registration', component: UserRegistrationComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
