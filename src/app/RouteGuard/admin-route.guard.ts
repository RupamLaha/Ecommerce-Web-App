import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { EcommerceService } from '../ecommerce.service';

@Injectable({
  providedIn: 'root'
})
export class AdminRouteGuard implements CanActivate {

  constructor(private ecomService: EcommerceService, private router: Router){

  }

  // canActivate(
  //   route: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  //   return true;
  // }
  
  canActivate(): boolean {
    if(this.ecomService.checkIfAdminLoggedIn()){
      return true
    }else{
      this.router.navigate(['seller-login'])
      return false
    }
}

}
