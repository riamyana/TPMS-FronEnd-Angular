import { StationComponent } from './admin/station/station.component';
import { PageNotFoundComponent } from './layouts/fullwidth/page-not-found/page-not-found.component';
import { TransportModeComponent } from './admin/transport-mode/transport-mode.component';
import { ManageUserTypeComponent } from './admin/manage-user-type/manage-user-type.component';
import { ManageSubscriptionTypeComponent } from './admin/manage-subscription-type/manage-subscription-type.component';
import { ManageProofComponent } from './admin/manage-proof/manage-proof.component';
import { ManagePackageComponent } from './admin/manage-package/manage-package.component';
import { FullwidthComponent } from './layouts/fullwidth/fullwidth.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { AdminComponent } from './admin/admin.component';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import { HomeComponent } from './modules/home/home.component';
import { LoginComponent } from './modules/login/login.component';
import { DefaultComponent } from './layouts/default/default.component';
// import { HomeComponent } from './admin/home/home.component';
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
    path: 'admin', component: DefaultComponent, children: [{ 
      path: 'manage', component: ManagePackageComponent, canActivate: [AuthGuard], data: { role: Roles.ADMIN, menuTitle: 'Manage' } 
    },{ 
      path: 'manage-member', component: ManageUserTypeComponent, canActivate: [AuthGuard], data: { role: Roles.ADMIN, menuTitle: 'Manage Member' } 
    }, { 
      path: 'manage-package', component: ManagePackageComponent, canActivate: [AuthGuard], data: { role: Roles.ADMIN, menuTitle: 'Manage Package' } 
    }, { 
      path: 'manage-proof', component: ManageProofComponent, canActivate: [AuthGuard], data: { role: Roles.ADMIN, menuTitle: 'Manage Member' } 
    }, { 
      path: 'manage-subscription-type', component: ManageSubscriptionTypeComponent, canActivate: [AuthGuard], data: { role: Roles.ADMIN, menuTitle: 'Manage Subscription Type' } 
    }, { 
      path: 'manage-transport-modes', component: TransportModeComponent, canActivate: [AuthGuard], data: { role: Roles.ADMIN, menuTitle: 'Manage Package' } 
    }, { 
      path: 'manage-station', component: StationComponent, canActivate: [AuthGuard], data: { role: Roles.ADMIN, menuTitle: 'Manage Station' } 
    }
  ]
  },
  { path: '', pathMatch:'full', redirectTo:'admin/login' },
  {
    path: '', component: FullwidthComponent, children: [{
      path: 'login', component: LoginComponent
    }, {
      path: 'home', component: HomeComponent
    }, {
      path: 'admin/login', component: AdminLoginComponent
    }, { 
      path: 'admin/dashboard', component: DashboardComponent, canActivate: [AuthGuard], data: { role: Roles.ADMIN } 
    }]
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
