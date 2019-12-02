import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardService implements CanActivate {

  constructor( private authenticationService: AuthenticationService,
               private router: Router ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (!this.authenticationService.isLoggedIn()) {
      return true;
    }
    this.router.navigate(['profile']);
    return false;
  }
}
