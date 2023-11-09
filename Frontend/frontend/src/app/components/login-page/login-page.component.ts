import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { JwtServiceService } from 'src/app/services/jwt-service.service';
import { User } from 'src/app/utils/interfaces/user';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {

  constructor(private builder: FormBuilder, private http: HttpClient, private router: Router, private jwtService: JwtServiceService, private cookieService: CookieService) { }

  loginUserForm = this.builder.group({
    username: this.builder.control(''),
    password: this.builder.control('')
  })
  loginUserString: string = "http://localhost:8081/users/login";

  login(): any {
    this.http.post<User>(this.loginUserString, this.loginUserForm.value, { "withCredentials": true }).subscribe({
      next: () => {
        this.navigate(this.jwtService.parseJwt(this.cookieService.get("auth-cookie")));
      },
      error: (error: any) => {
        alert("Login failed successfully!");
      }
    });
  }

  navigate(user: any) {
    let navigationExtras: NavigationExtras = {};

    if (user.roles === 'ADMIN') {
      this.router.navigateByUrl('admin', navigationExtras);
    } else if (user.roles === 'CLIENT') {
      this.router.navigateByUrl('client', navigationExtras);
    }
    else this.router.navigateByUrl("");
  }
}
