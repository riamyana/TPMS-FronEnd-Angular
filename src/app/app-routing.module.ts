import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { AdminComponent } from './admin/admin.component';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import { HomeComponent } from './modules/home/home.component';
import { LoginComponent } from './modules/login/login.component';
import { DefaultComponent } from './layouts/default/default.component';
// import { HomeComponent } from './admin/home/home.component';
import { ManageUserTypeComponent } from './admin/manage-user-type/manage-user-type.component';
import { Roles } from './constants/roles';
import { AuthGuard } from './auth.guard';
// import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
// import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  // { path: 'login', component: LoginComponent },
  { path: 'admin', component: AdminComponent },
  // { path: 'admin/login', component: AdminLoginComponent },
  // { path: 'admin/home', component: AdminHomeComponent },
  {
    path: '', component: DefaultComponent, children: [{
      path: 'login', component: LoginComponent
    }, {
      path: 'home', component: HomeComponent
    }, {
      path: 'admin/login', component: AdminLoginComponent
    }, { 
      path: 'admin/dashboard', component: DashboardComponent, canActivate: [AuthGuard], data: { role: Roles.ADMIN } 
    }, { 
      path: 'admin/manage-member', component: ManageUserTypeComponent, canActivate: [AuthGuard], data: { role: Roles.ADMIN } 
    }]
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
