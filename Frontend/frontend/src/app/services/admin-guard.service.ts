import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { JwtServiceService } from './jwt-service.service';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminGuardService implements CanActivate{

  constructor(private cookieService: CookieService, private jwtService: JwtServiceService, private router: Router) { }

  canActivate(){  
    if(this.cookieService.get("auth-cookie")){
      const role = this.jwtService.parseJwt(this.cookieService.get("auth-cookie")).roles;
      if(role === 'ADMIN') return true;
    }
    this.router.navigate(['login']);
    return false;
  }
}
