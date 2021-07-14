import { ManageProfileComponent } from './member/manage-profile/manage-profile.component';
import { ChangePasswordComponent } from './modules/forgot-password/change-password/change-password.component';
import { OtpComponent } from './modules/forgot-password/otp/otp.component';
import { ForgotPasswordComponent } from './modules/forgot-password/forgot-password.component';
import { ManageProofRequirementComponent } from './admin/manage-proof-requirement/manage-proof-requirement.component';
import { PassRequestTabsComponent } from './member/pass-request-tabs/pass-request-tabs.component';
import { MemberProfileComponent } from './member/member-profile/member-profile.component';
import { RegistrationComponent } from './member/registration/registration.component';
import { MemberLoginComponent } from './member/member-login/member-login.component';
import { PassRequestComponent } from './admin/pass-request/pass-request.component';
import { ResetPasswordComponent } from './modules/profile/reset-password/reset-password.component';
import { MyProfileComponent } from './modules/profile/my-profile/my-profile.component';
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
import { TransportCostComponent } from './admin/transport-cost/transport-cost.component';


const routes: Routes = [
  { path: 'admin', component: AdminComponent },
  {
    path: 'admin', component: DefaultComponent, children: [{
      path: 'manage', component: ManagePackageComponent, canActivate: [AuthGuard], data: { role: Roles.ADMIN, menuTitle: 'Manage' }
    }, {
      path: 'manage-member', component: ManageUserTypeComponent, canActivate: [AuthGuard], data: { role: Roles.ADMIN, menuTitle: 'Manage Member' }
    }, {
      path: 'manage-package', component: ManagePackageComponent, canActivate: [AuthGuard], data: { role: Roles.ADMIN, menuTitle: 'Manage Package' }
    }, {
      path: 'manage-proof', component: ManageProofComponent, canActivate: [AuthGuard], data: { role: Roles.ADMIN, menuTitle: 'Manage Member' }
    }, {
      path: 'manage-proof-requirement', component: ManageProofRequirementComponent, canActivate: [AuthGuard], data: { role: Roles.ADMIN, menuTitle: 'Manage Member' }
    }, {
      path: 'manage-subscription-type', component: ManageSubscriptionTypeComponent, canActivate: [AuthGuard], data: { role: Roles.ADMIN, menuTitle: 'Manage Subscription Type' }
    }, {
      path: 'manage-transport-modes', component: TransportModeComponent, canActivate: [AuthGuard], data: { role: Roles.ADMIN, menuTitle: 'Manage Package' }
    }, {
      path: 'manage-station', component: StationComponent, canActivate: [AuthGuard], data: { role: Roles.ADMIN, menuTitle: 'Manage Routes' }
    }, {
      path: 'manage-transport-cost', component: TransportCostComponent, canActivate: [AuthGuard], data: { role: Roles.ADMIN, menuTitle: 'Manage Routes' }
    }, {
      path: 'my-profile', component: MyProfileComponent, canActivate: [AuthGuard]
    }, {
      path: 'reset-password', component: ResetPasswordComponent
    }, {
      path: 'pass-request', component: PassRequestComponent, canActivate: [AuthGuard], data: { role: Roles.ADMIN }
    }
    ]
  },
  { path: '', pathMatch: 'full', redirectTo: 'admin/login' },
  {
    path: '', component: FullwidthComponent, children: [{
      path: 'login', component: LoginComponent
    }, {
      path: 'forgot-password', component: ForgotPasswordComponent
    }, {
      path: 'forgot-password/:userName', component: OtpComponent
    }, {
      path: 'forgot-password/:userName/:otp', component: ChangePasswordComponent
    }, {
      path: 'home', component: HomeComponent
    }, {
      path: 'admin/login', component: AdminLoginComponent
    }, {
      path: 'admin/dashboard', component: DashboardComponent, canActivate: [AuthGuard], data: { role: Roles.ADMIN }
    }, {
      path: 'user/login', component: MemberLoginComponent
    }, {
      path: 'user/register', component: RegistrationComponent
    }, {
      path: 'user/pass-request', component: PassRequestTabsComponent, canActivate: [AuthGuard], data: { role: Roles.USER }
    }, {
      path: 'user/my-profile', component: ManageProfileComponent, canActivate: [AuthGuard]
    }]
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
