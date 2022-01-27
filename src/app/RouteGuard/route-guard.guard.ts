import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { EcommerceService } from '../ecommerce.service';

@Injectable({
  providedIn: 'root'
})

//route guard for user side...

export class RouteGuardGuard implements CanActivate {

  constructor(private ecomService: EcommerceService, private router: Router){

  }

  canActivate(): boolean {
      if(this.ecomService.checkIfUserLoggedIn()){
        return true
      }else{
        this.router.navigate(['user-login'])
        return false
      }
  }
 
}
