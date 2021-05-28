import { AddMemberComponent } from './../../admin/manage-user-type/add-member/add-member.component';
import { DashboardComponent } from './../../admin/dashboard/dashboard.component';
import { AdminComponent } from './../../admin/admin.component';
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



@NgModule({
  declarations: [
    DefaultComponent,
    HomeComponent,
    LoginComponent,
    AdminLoginComponent,
    HomeComponent,
    DashboardComponent,
    AddMemberComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FlexLayoutModule,
    SharedModule,
    MaterialModule,
    ReactiveFormsModule
  ], 
  exports: [
    DefaultComponent,
    HomeComponent,
    LoginComponent,
    AdminLoginComponent,
    DashboardComponent,
    AddMemberComponent
  ]
})
export class DefaultModule { }
