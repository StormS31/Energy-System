import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { JwtServiceService } from 'src/app/services/jwt-service.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {

  constructor(private router: Router,  
    private jwtService: JwtServiceService, 
    private cookieService: CookieService) {}

  logOut() {
    if (confirm("Are you sure you want to log out?")) {
      this.cookieService.deleteAll();
      this.router.navigateByUrl('login');
    }
  }

}
