import { AdminComponent } from './admin.component';
import { MaterialModule } from './../material/material.module';
import { RouterModule } from '@angular/router';
// import { DefaultModule } from './../layouts/default/default.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LayoutModule } from '@angular/cdk/layout';
import { ManagePackageComponent } from './manage-package/manage-package.component';
import { ManageProofComponent } from './manage-proof/manage-proof.component';
import { AddProofComponent } from './manage-proof/add-proof/add-proof.component';
import { EditProofComponent } from './manage-proof/edit-proof/edit-proof.component';
import { ManageSubscriptionTypeComponent } from './manage-subscription-type/manage-subscription-type.component';
import { EditMemberTypeComponent } from './manage-user-type/edit-member-type/edit-member-type.component';
import { TransportModeComponent } from './transport-mode/transport-mode.component';
import { AddTransportModeComponent } from './transport-mode/add-transport-mode/add-transport-mode.component';
import { EditTransportModeComponent } from './transport-mode/edit-transport-mode/edit-transport-mode.component';
import { AddPackageComponent } from './manage-package/add-package/add-package.component';
import { ManageProof2Component } from './manage-proof2/manage-proof2.component';
import { StationComponent } from './station/station.component';
import { PassRequestComponent } from './pass-request/pass-request.component';
import { AddUpdateStationComponent } from './station/add-update-station/add-update-station.component';
import { TransportCostComponent } from './transport-cost/transport-cost.component';
import { AddUpdateTransportCostComponent } from './transport-cost/add-update-transport-cost/add-update-transport-cost.component';



@NgModule({
  declarations: [
    AdminComponent,
    DashboardComponent,
    ManagePackageComponent,
    ManageProofComponent,
    AddProofComponent,
    EditProofComponent,
    ManageSubscriptionTypeComponent,
    EditMemberTypeComponent,
    TransportModeComponent,
    AddTransportModeComponent,
    EditTransportModeComponent,
    AddPackageComponent,
    ManageProof2Component,
    StationComponent,
    PassRequestComponent,
    AddUpdateStationComponent,
    TransportCostComponent,
    AddUpdateTransportCostComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FlexLayoutModule,
    MaterialModule,
    ReactiveFormsModule,
    LayoutModule
  ]
})
export class AdminModule { }
