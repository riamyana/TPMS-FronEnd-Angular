import { EnrolledPackageComponent } from './../../../member/enrolled-package/enrolled-package.component';
import { Roles } from './../../../constants/roles';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserModel } from './../../../_models/userModel';
import { AuthenticationService } from './../../../_services/authentication.service';
import { ResetPasswordComponent } from './../reset-password/reset-password.component';
import { UpdateProfileComponent } from './../update-profile/update-profile.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MemberProfile } from './../../../_models/memberProfile';
import { LoaderService } from './../../../_services/loader/loader.service';
import { BehaviorSubject } from 'rxjs';
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
  imageUrl: string | ArrayBuffer = "../../../../assets/undraw_profile_pic_ic5t.svg";
  profileImageForm: FormGroup;
  fileToUpload: File;
  roles = Roles;

  constructor(
    public dialog: MatDialog,
    private profileService: ProfileService,
    private router: Router,
    private notifierService: NotifierService,
    private authService: AuthenticationService,
    public sideNavService: SideNavService,
    private formBuilder: FormBuilder,
    public loader: LoaderService
  ) {
    this.sideNavService.navTitle = "My Profile";
  }

  get profile(): MemberProfile[] {
    return this.profileData.getValue();
  }

  ngOnInit(): void {
    this.initForm();
    this.currentUser = this.authService.currentUserValue;
    // this.getProfile();

    if (this.currentUser.profileImage)
      this.imageUrl = `http://localhost:8080/image/${this.currentUser.profileImage}`;
  }

  initForm() {
    this.profileImageForm = this.formBuilder.group({
      profileImage: ['', Validators.required]
    });
  }

  passwordChange() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    this.dialog.open(ResetPasswordComponent, dialogConfig);
  }

  packageDetails() {
    this.dialog.open(EnrolledPackageComponent);
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

    const dialogRef = this.dialog.open(UpdateProfileComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.imageUrl = `http://localhost:8080/image/${result.profileImage}`;
      }
    });
  }

  onUpdate() {
    if (this.profileImageForm.invalid) {
      alert('Please Select Image');
      return;
    }

    const profileImage = this.profileImageForm.get('profileImage').value;
    const userName = this.currentUser.userName;

    this.authService.updateProfile(this.fileToUpload, userName).subscribe(
      data => {
        this.currentUser.profileImage = data.profileImage;
        this.authService.currentUserSubject.next(this.currentUser);
        this.notifierService.showNotification(NotifierMsg.profileImage('success'), 'OK', 'success');
      },
      err => {
        if (err.status == 401 || err.status == 403) {
          this.router.navigateByUrl('/user/login');
        } else {
          this.notifierService.showNotification(NotifierMsg.profileImage('error'), 'OK', 'error');
        }
      }
    );
  }

  handleFileInput(event) {

    if (event.target.files && event.target.files[0]) {

      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        this.imageUrl = event.target.result;
      }

      this.fileToUpload = event.target.files[0];



      if (event.target.files[0].size > 2000000) {
        alert('Image size exceed.');
        event.target.value = null;
      }
    }
  }

}
