import { Roles } from './constants/roles';
import { AuthenticationService } from './_services/authentication.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    // if (this.authService.loggedIn()) {
    //   const loginData = this.authService.getRole();

    //   console.log(route.data.role);
    //   // console.log(role);
    //   if (route.data.role && route.data.role == loginData.role) {
    //     console.log(true);
    //     return true;
    //   } else {
    //     return false;
    //   }
    // } else {
    //   this.router.navigate(['/login']);
    //   console.log(false);
    //   return false;
    // }


    const currentUser = this.authService.currentUserValue;
    if (currentUser) {
      console.log(route.data.role);
      // currentUser.role = Roles.USER;
      console.log(currentUser.role);
      // check if route is restricted by role
      // && route.data.role != currentUser.role
      if (route.data.role && route.data.role != currentUser.role) {
        // role not authorised so redirect to home page
        console.log("in");
        this.router.navigate(['/']);
        return false;
      }

      // authorised so return true
      return true;
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }

}