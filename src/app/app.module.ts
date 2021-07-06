import { MemberModule } from './member/member.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FullwidthModule } from './layouts/fullwidth/fullwidth.module';
import { AdminComponent } from './admin/admin.component';
import { DefaultModule } from './layouts/default/default.module';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { AuthGuard } from './auth.guard';
import { AuthenticationService } from './_services/authentication.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LayoutModule } from '@angular/cdk/layout';
import { NotifierComponent } from './notifier/notifier.component';
import { ConfirmDialogComponent } from './dialog/confirm-dialog/confirm-dialog.component';
import { MyProfileComponent } from './modules/profile/my-profile/my-profile.component';
import { ResetPasswordComponent } from './modules/profile/reset-password/reset-password.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    NotifierComponent,
    ConfirmDialogComponent,
    MyProfileComponent,
    ResetPasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    LayoutModule,
    DefaultModule,
    FullwidthModule,
    FlexLayoutModule,
    MemberModule
  ],
  providers: [AuthenticationService, AuthGuard,
  {
    provide: HTTP_INTERCEPTORS,
    useClass: JwtInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
