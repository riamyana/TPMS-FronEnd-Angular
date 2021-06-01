import { ManagePackageComponent } from './../../admin/manage-package/manage-package.component';
import { MaterialModule } from './../../material/material.module';
import { ManageUserTypeComponent } from './../../admin/manage-user-type/manage-user-type.component';
import { SharedModule } from './../../shared/shared.module';
import { RouterModule } from '@angular/router';
import { FullwidthComponent } from './fullwidth.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';



@NgModule({
  declarations: [
    FullwidthComponent,
    ManageUserTypeComponent,
    ManagePackageComponent,
    PageNotFoundComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    FlexLayoutModule,
    MaterialModule
  ]
})
export class FullwidthModule { }
