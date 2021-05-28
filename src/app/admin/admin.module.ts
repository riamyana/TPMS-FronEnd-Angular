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



@NgModule({
  declarations: [
    AdminComponent,
    DashboardComponent,
    ManagePackageComponent
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
