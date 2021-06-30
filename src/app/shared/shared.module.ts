import { ReactiveFormsModule } from '@angular/forms';
import { AppDirectiveModule } from './../appDirective/app-directive.module';
import { NavComponent } from './nav/nav.component';
import { LoginComponent } from './../modules/login/login.component';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule} from '@angular/flex-layout';
import { MaterialModule } from '../material/material.module';



@NgModule({
  declarations: [
    HeaderComponent,
    NavComponent,
    LoginComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FlexLayoutModule,
    MaterialModule,
    AppDirectiveModule,
    ReactiveFormsModule
  ],
  exports: [
    HeaderComponent,
    NavComponent,
    LoginComponent,
  ]
})
export class SharedModule { }
