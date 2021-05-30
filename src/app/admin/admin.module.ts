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
import { EditMemberTypeComponent } from './manage-user-type/edit-member-type/edit-member-type.component';
import { ManageProofComponent } from './manage-proof/manage-proof.component';
import { AddProofComponent } from './manage-proof/add-proof/add-proof.component';
import { EditProofComponent } from './manage-proof/edit-proof/edit-proof.component';
import { SubscriptionTypeComponent } from './subscription-type/subscription-type.component';
import { ManageSubscriptionTypeComponent } from './manage-subscription-type/manage-subscription-type.component';



@NgModule({
  declarations: [
    AdminComponent,
    DashboardComponent,
    ManagePackageComponent,
    EditMemberTypeComponent,
    ManageProofComponent,
    AddProofComponent,
    EditProofComponent,
    SubscriptionTypeComponent,
    ManageSubscriptionTypeComponent
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
