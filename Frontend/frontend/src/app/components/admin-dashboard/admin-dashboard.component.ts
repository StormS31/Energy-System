import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BackendsService } from 'src/app/services/backends.service';
import { User } from 'src/app/utils/interfaces/user';
import { EditPopupComponent } from './edit-popup/edit-popup.component';
import { AddUserPopupComponent } from './add-user-popup/add-user-popup.component';
import { Device } from 'src/app/utils/interfaces/device';
import { AddDevicePopupComponent } from './add-device-popup/add-device-popup.component';
import { EditDevicePopupComponent } from './edit-device-popup/edit-device-popup.component';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})

export class AdminDashboardComponent implements OnInit {
  dataSource: User[] = [];
  devices: Device[] = [];
  constructor(private backendService: BackendsService, private dialog: MatDialog) {

  }
  ngOnInit(): void {
    this.backendService.getUsers().subscribe((result: User[]) => this.dataSource = result);
    this.backendService.getDevices().subscribe((results: Device[]) => this.devices = results);
  }

  deleteUser(id: number) {
    this.backendService.deleteUser(id).subscribe({
      next: result => {
        this.backendService.deleteDeviceUser(id).subscribe((result)=>{
          console.log(result);
          this.ngOnInit();
        })
      },
      error: error => {
        console.log(error);
      }
    });
  }

  openEditUserDialog(id: number) {
    this.backendService.getUserById(id).subscribe((result: User) => {
      var editDialog = this.dialog.open(EditPopupComponent, { width: '500px', height: '1000px', data: result });
      editDialog.afterClosed().subscribe(() => { this.ngOnInit() });
    });
  }

  openAddUserDialog(){
    var addDialog = this.dialog.open(AddUserPopupComponent, {width: '500px', height:'1000px'});
    addDialog.afterClosed().subscribe(() => { this.ngOnInit(); });
  }

  openAddDeviceDialog(){
    var addDialog = this.dialog.open(AddDevicePopupComponent, {width: '500px', height:'1000px'});
    addDialog.afterClosed().subscribe(() => { this.ngOnInit(); });
  }

  openEditDeviceDialog(id: number){
    this.backendService.getDeviceById(id).subscribe((result: Device) =>{
      var addDialog = this.dialog.open(EditDevicePopupComponent, {width: '500px', height:'1000px', data: result});
      addDialog.afterClosed().subscribe(() => { this.ngOnInit(); });
    })
  }

  deleteDevice(id: number){
    this.backendService.deleteDevice(id).subscribe({
      next: data => {
        this.ngOnInit();
      },
      error: error => {
        console.log(error);
      }
    });
  }

  displayedColumnsUsers: string[] = ['id', 'username', 'fullname', 'role', 'edit', 'delete'];
  displayedColumnsDevices: string[] = ['id', 'description', 'address', 'consumption','ownerId', 'edit', 'delete'];

}
