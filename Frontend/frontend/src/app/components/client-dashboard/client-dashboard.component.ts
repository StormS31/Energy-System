import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { BackendsService } from 'src/app/services/backends.service';
import { JwtServiceService } from 'src/app/services/jwt-service.service';
import { Device } from 'src/app/utils/interfaces/device';

@Component({
  selector: 'app-client-dashboard',
  templateUrl: './client-dashboard.component.html',
  styleUrls: ['./client-dashboard.component.scss']
})
export class ClientDashboardComponent {

  devices: Device[] = [];
  constructor(private backendService: BackendsService, private cookieService: CookieService, private jwtService: JwtServiceService) {

  }
  ngOnInit(): void {
    let token = this.cookieService.get("auth-cookie");
    let id =  parseInt(this.jwtService.parseJwt(token).id);
    this.backendService.getOwnedDevices(id).subscribe((results: Device[]) => this.devices = results);
  }

  displayedColumnsDevices: string[] = ['id', 'description', 'address', 'consumption'];

}
