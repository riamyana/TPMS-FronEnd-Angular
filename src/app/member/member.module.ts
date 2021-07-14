import { WizardContentDirective, WizardItemDirective, WizardTabIconDirective } from './../demoWizard/wizard-item.directive';
import { WizardComponent } from './../demoWizard/wizard/wizard.component';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from './../shared/shared.module';
import { MemberComponent } from './member.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './../material/material.module';
import { RegistrationComponent } from './registration/registration.component';
import { MemberLoginComponent } from './member-login/member-login.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MemberProfileComponent } from './member-profile/member-profile.component';
import { PassRequestTabsComponent } from './pass-request-tabs/pass-request-tabs.component';
import { PortalModule } from '@angular/cdk/portal';
import { MemberAddressComponent } from './member-address/member-address.component';
import { MemberProofComponent } from './member-proof/member-proof.component';
import { ViewPassComponent } from './view-pass/view-pass.component';
import { QRCodeModule } from 'angularx-qrcode';
import { ManageProfileComponent } from './manage-profile/manage-profile.component';


@NgModule({
  declarations: [
    MemberComponent,
    MemberLoginComponent,
    RegistrationComponent,
    MemberProfileComponent,
    PassRequestTabsComponent,
    WizardComponent,
    WizardItemDirective,
    WizardContentDirective,
    WizardTabIconDirective,
    MemberAddressComponent,
    MemberProofComponent,
    ViewPassComponent,
    ManageProfileComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    SharedModule,
    MaterialModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    PortalModule,
    QRCodeModule
  ], 
  exports: [
    MemberLoginComponent,
    RegistrationComponent,
    MemberComponent
  ]
})
export class MemberModule { }
