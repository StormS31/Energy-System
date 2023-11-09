import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule} from '@angular/material/button';
import { NavBarComponent } from './components/nav-bar/nav-bar.component'
import { MatToolbarModule} from '@angular/material/toolbar';
import { AppComponent } from './components/app/app.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component'
import {MatTableModule} from '@angular/material/table';
import { BackendsService } from './services/backends.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { EditPopupComponent } from './components/admin-dashboard/edit-popup/edit-popup.component';
import { MatDialogModule } from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddUserPopupComponent } from './components/admin-dashboard/add-user-popup/add-user-popup.component';
import { AddDevicePopupComponent } from './components/admin-dashboard/add-device-popup/add-device-popup.component';
import { EditDevicePopupComponent } from './components/admin-dashboard/edit-device-popup/edit-device-popup.component';
import {MatIconModule} from '@angular/material/icon';
import { ClientDashboardComponent } from './components/client-dashboard/client-dashboard.component';
import { HttpInterceptorService } from './services/http-interceptor.service';

@NgModule({
  declarations: [
    LoginPageComponent,
    NavBarComponent,
    AppComponent,
    AdminDashboardComponent,
    EditPopupComponent,
    AddUserPopupComponent,
    AddDevicePopupComponent,
    EditDevicePopupComponent,
    ClientDashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatToolbarModule,
    MatTableModule,
    HttpClientModule,
    MatDialogModule,    
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule

  ],
  providers: [BackendsService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true
    },],
  bootstrap: [AppComponent]
})
export class AppModule { }
