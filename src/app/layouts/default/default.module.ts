import { PassRequestComponent } from './../../admin/pass-request/pass-request.component';
import { AddUpdateTransportCostComponent } from './../../admin/transport-cost/add-update-transport-cost/add-update-transport-cost.component';
import { AgmCoreModule } from '@agm/core';
import { AddUpdateStationComponent } from './../../admin/station/add-update-station/add-update-station.component';
import { StationComponent } from './../../admin/station/station.component';
import { AddPackageComponent } from './../../admin/manage-package/add-package/add-package.component';
import { EditTransportModeComponent } from './../../admin/transport-mode/edit-transport-mode/edit-transport-mode.component';
import { AddTransportModeComponent } from './../../admin/transport-mode/add-transport-mode/add-transport-mode.component';
import { TransportModeComponent } from './../../admin/transport-mode/transport-mode.component';
import { EditProofComponent } from './../../admin/manage-proof/edit-proof/edit-proof.component';
import { AddProofComponent } from './../../admin/manage-proof/add-proof/add-proof.component';
import { ManageProofComponent } from './../../admin/manage-proof/manage-proof.component';
import { EditMemberTypeComponent } from './../../admin/manage-user-type/edit-member-type/edit-member-type.component';
import { AppDirectiveModule } from './../../appDirective/app-directive.module';
import { AddMemberComponent } from './../../admin/manage-user-type/add-member/add-member.component';
import { DashboardComponent } from './../../admin/dashboard/dashboard.component';
import { AdminLoginComponent } from './../../admin/admin-login/admin-login.component';
import { MaterialModule } from './../../material/material.module';
import { SharedModule } from './../../shared/shared.module';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './../../modules/login/login.component';
import { HomeComponent } from './../../modules/home/home.component';
import { DefaultComponent } from './default.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { TransportCostComponent } from 'src/app/admin/transport-cost/transport-cost.component';



@NgModule({
  declarations: [
    DefaultComponent,
    HomeComponent,
    AdminLoginComponent,
    HomeComponent,
    DashboardComponent,
    AddMemberComponent,
    EditMemberTypeComponent,
    ManageProofComponent,
    AddProofComponent,
    EditProofComponent,
    TransportModeComponent,
    AddTransportModeComponent,
    EditTransportModeComponent,
    AddPackageComponent,
    StationComponent,
    AddUpdateStationComponent,
    TransportCostComponent,
    AddUpdateTransportCostComponent,
    PassRequestComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FlexLayoutModule,
    SharedModule,
    MaterialModule,
    ReactiveFormsModule,
    AppDirectiveModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDTtaFlEBursUoZoX_oyIm3V6H_NXx8KGE'
    })
  ], 
  exports: [
    DefaultComponent,
    HomeComponent,
    AdminLoginComponent,
    HomeComponent,
    DashboardComponent,
    AddMemberComponent,
    EditMemberTypeComponent,
    ManageProofComponent,
    AddProofComponent,
    EditProofComponent,
    TransportModeComponent,
    AddTransportModeComponent,
    EditTransportModeComponent,
    AddPackageComponent,
    StationComponent,
    AddUpdateStationComponent,
    TransportCostComponent,
    AddUpdateTransportCostComponent,
    PassRequestComponent
  ]
})
export class DefaultModule { }
