import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../utils/interfaces/user';
import { Observable } from 'rxjs';
import { Device } from '../utils/interfaces/device';
import { ResponseBackend } from '../utils/interfaces/response';

@Injectable({
  providedIn: 'root'
})
export class BackendsService {

  usersBackendUrl: string = "http://localhost:8081/users/";
  devicesBackendUrl: string = "http://localhost:8082/devices/";
  devicesUsersBackendUrl: string = "http://localhost:8082/users/"

  // usersBackendUrl: string = "http://localhost:8080/users/";
  // devicesBackendUrl: string = "http://localhost:8081/devices/";
  // devicesUsersBackendUrl: string = "http://localhost:8081/users/"

  getUsersUrl: string = "get-users";
  deleteUserUrl: string = "delete-user/";
  getUserByIdUrl: string = "get-user/";
  updateUserByIdUrl: string = "edit-user/";
  addUserUrl: string = "add-user";

  getDevicesUrl: string = "get-devices";
  addDeviceUrl: string = "add-device";
  deleteDeviceUrl: string = "delete-device/";
  getDeviceByIdUrl: string = "get-device/";
  updateDeviceByIdUrl: string = "edit-device/";
  addDeviceUserUrl: string = "add-user/";
  deleteDeviceUserUrl: string = "delete-user/";
  getOwnedDevicesUrl: string = "get-owned-devices/";

  constructor( private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.usersBackendUrl + this.getUsersUrl)
  }

  deleteUser(id: number): Observable<string>{
    return this.http.delete<string>(this.usersBackendUrl + this.deleteUserUrl + id);
  }

  getUserById(id: number): Observable<User>{
    return this.http.get<User>(this.usersBackendUrl + this.getUserByIdUrl + id);
  }

  updateUser(id: number, userForm: any): Observable<User>{
    return this.http.put<User>(this.usersBackendUrl + this.updateUserByIdUrl + id, userForm);
  }

  addUser(userForm: any): Observable<User>{
    return this.http.post<User>(this.usersBackendUrl + this.addUserUrl, userForm);
  }

  addUserToDevicesDb(id: number): Observable<ResponseBackend>{
    return this.http.post<ResponseBackend>(this.devicesUsersBackendUrl + this.addDeviceUserUrl + id, null);
  }

  deleteDeviceUser(id: number): Observable<ResponseBackend>{
    return this.http.delete<ResponseBackend>(this.devicesUsersBackendUrl + this.deleteDeviceUserUrl + id);
  }

  getDevices(): Observable<Device[]> {
    return this.http.get<Device[]>(this.devicesBackendUrl + this.getDevicesUrl)
  }

  deleteDevice(id: number): Observable<string>{
    return this.http.delete<string>(this.devicesBackendUrl + this.deleteDeviceUrl + id);
  }

  getDeviceById(id: number): Observable<Device>{
    return this.http.get<Device>(this.devicesBackendUrl + this.getDeviceByIdUrl + id);
  }

  updateDevice(id: number, deviceForm: any): Observable<ResponseBackend>{
    return this.http.put<ResponseBackend>(this.devicesBackendUrl + this.updateDeviceByIdUrl + id, deviceForm);
  }

  addDevice(deviceForm: any): Observable<ResponseBackend>{
    return this.http.post<ResponseBackend>(this.devicesBackendUrl + this.addDeviceUrl, deviceForm);
  }

  getOwnedDevices(id: number): Observable<Device[]>{
    return this.http.get<Device[]>(this.devicesBackendUrl + this.getOwnedDevicesUrl + id);
  }
}
