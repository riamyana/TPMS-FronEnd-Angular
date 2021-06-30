import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from './../shared/shared.module';
import { MemberComponent } from './member.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './../material/material.module';
import { RegistrationComponent } from './registration/registration.component';
import { MemberLoginComponent } from './member-login/member-login.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MemberProfileComponent } from './member-profile/member-profile.component';



@NgModule({
  declarations: [
    MemberComponent,
    MemberLoginComponent,
    RegistrationComponent,
    MemberProfileComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    SharedModule,
    MaterialModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    RouterModule
  ], 
  exports: [
    MemberLoginComponent,
    RegistrationComponent,
    MemberComponent
  ]
})
export class MemberModule { }
