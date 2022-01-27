import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { EcommerceService } from '../ecommerce.service';

@Injectable({
  providedIn: 'root'
})

//route guard for admin side...

export class AdminRouteGuard implements CanActivate {

  constructor(private ecomService: EcommerceService, private router: Router){

  }
  
  canActivate(): boolean {
    if(this.ecomService.checkIfAdminLoggedIn()){
      return true
    }else{
      this.router.navigate(['seller-login'])
      return false
    }
}

}
