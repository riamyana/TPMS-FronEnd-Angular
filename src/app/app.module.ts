import { AdminComponent } from './admin/admin.component';
// import { AdminModule } from './admin/admin.module';
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
import { ReactiveFormsModule } from '@angular/forms';
// import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
import { NavComponent } from './nav/nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { ManageUserTypeComponent } from './admin/manage-user-type/manage-user-type.component';
// import { HomeComponent } from './admin/adminHome/home.component';
import { NotifierComponent } from './notifier/notifier.component';
import { ConfirmDialogComponent } from './dialog/confirm-dialog/confirm-dialog.component';



@NgModule({
  declarations: [
    AppComponent,
    // AdminHomeComponent,
    NavComponent,
    ManageUserTypeComponent,
    // HomeComponent,
    AdminComponent,
    NotifierComponent,
    ConfirmDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    LayoutModule,
    DefaultModule
    // AdminModule
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
