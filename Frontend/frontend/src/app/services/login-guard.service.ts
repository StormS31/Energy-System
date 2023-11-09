import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { JwtServiceService } from './jwt-service.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardService implements CanActivate {

  constructor(private cookieService: CookieService, private router: Router, private jwtService: JwtServiceService) { }

  canActivate(): boolean {
    if (this.cookieService.get("auth-cookie")) {
      const role = this.jwtService.parseJwt(this.cookieService.get("auth-cookie")).roles;
      if (role === 'ADMIN')
        this.router.navigate(["admin"])
      else
        this.router.navigate(["client"])
      return false;
    }
    return true;
  }
}
