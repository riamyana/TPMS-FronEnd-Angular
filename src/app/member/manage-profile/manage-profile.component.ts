import { UpdateProfileComponent } from './../../modules/profile/update-profile/update-profile.component';
import { MemberProfileComponent } from './../member-profile/member-profile.component';
import { UserModel } from './../../_models/userModel';
import { AuthenticationService } from './../../_services/authentication.service';
import { BehaviorSubject } from 'rxjs';
import { MemberProfile } from './../../_models/memberProfile';
import { NotifierMsg } from 'src/app/constants/notifierMsg';
import { NotifierService } from './../../_services/notifier/notifier.service';
import { Router } from '@angular/router';
import { ProfileService } from './../../_services/profile/profile.service';
import { ResetPasswordComponent } from './../../modules/profile/reset-password/reset-password.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-manage-profile',
  templateUrl: './manage-profile.component.html',
  styleUrls: ['./manage-profile.component.scss']
})
export class ManageProfileComponent implements OnInit {
  profileData: BehaviorSubject<MemberProfile[]> = new BehaviorSubject(null);
  currentUser: UserModel;

  constructor(
    public dialog: MatDialog,
    private profileService: ProfileService,
    private router: Router,
    private notifierService: NotifierService,
    private authService: AuthenticationService
  ) { }

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
