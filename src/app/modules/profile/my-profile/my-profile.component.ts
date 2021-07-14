import { UserModel } from './../../../_models/userModel';
import { AuthenticationService } from './../../../_services/authentication.service';
import { ResetPasswordComponent } from './../reset-password/reset-password.component';
import { UpdateProfileComponent } from './../update-profile/update-profile.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MemberProfile } from './../../../_models/memberProfile';
import { LoaderService } from './../../../_services/loader/loader.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { ProfileData } from './../../../_models/profile/profileData';
import { NotifierMsg } from './../../../constants/notifierMsg';
import { NotifierService } from './../../../_services/notifier/notifier.service';
import { Router } from '@angular/router';
import { ProfileService } from './../../../_services/profile/profile.service';
import { SideNavService } from './../../../_services/side-nav/side-nav.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit {

  profileData: BehaviorSubject<MemberProfile[]> = new BehaviorSubject(null);
  currentUser: UserModel;

  constructor(
    public dialog: MatDialog,
    private profileService: ProfileService,
    private router: Router,
    private notifierService: NotifierService,
    private authService: AuthenticationService,
    public sideNavService: SideNavService,
  ) {
    this.sideNavService.navTitle = "My Profile";
  }

  get profile(): MemberProfile[] {
    return this.profileData.getValue();
  }

  ngOnInit(): void {
    this.currentUser = this.authService.currentUserValue;
    this.getProfile();
  }

  passwordChange() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    this.dialog.open(ResetPasswordComponent, dialogConfig);
  }

  getProfile() {
    this.profileService.getUserProfile(this.currentUser.id).subscribe(
      data => {
        this.profileData.next(data);
        console.log(data);
      },
      err => {
        if (err.status == 401 || err.stats == 403) {
          this.router.navigateByUrl('user/login');
        } else {
          this.notifierService.showNotification(NotifierMsg.errorMsg, 'OK', 'error');
        }
      });
  }

  manageProfile() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = this.profile;

    this.dialog.open(UpdateProfileComponent, dialogConfig);
  }

}
