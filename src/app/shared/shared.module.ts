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
import { FooterComponent } from './footer/footer.component';



@NgModule({
  declarations: [
    HeaderComponent,
    NavComponent,
    LoginComponent,
    FooterComponent
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
    FooterComponent
  ]
})
export class SharedModule { }
