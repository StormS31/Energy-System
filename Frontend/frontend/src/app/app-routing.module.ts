import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { ClientDashboardComponent } from './components/client-dashboard/client-dashboard.component';
import { LoginGuardService } from './services/login-guard.service';
import { AdminGuardService } from './services/admin-guard.service';
import { ClientGuardService } from './services/client-guard.service';

const routes: Routes = [
  {path: 'login', component: LoginPageComponent, canActivate: [LoginGuardService]},
  {path: 'admin', component: AdminDashboardComponent, canActivate: [AdminGuardService]},
  {path: 'client', component: ClientDashboardComponent, canActivate: [ClientGuardService]},
  {path: '**', redirectTo: 'login'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
