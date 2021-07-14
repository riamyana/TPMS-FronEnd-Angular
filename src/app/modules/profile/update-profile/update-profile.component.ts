import { ProfileData } from './../../../_models/profile/profileData';
import { ProfileService } from './../../../_services/profile/profile.service';
import { AuthenticationService } from './../../../_services/authentication.service';
import { UserModel } from './../../../_models/userModel';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MemberProfile } from './../../../_models/memberProfile';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.scss']
})
export class UpdateProfileComponent implements OnInit {
  profileForm: FormGroup;
  currentUser: UserModel;
  memberProfile: ProfileData;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: MemberProfile[],
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private profileService: ProfileService
  ) { }

  ngOnInit(): void {
    this.currentUser = this.authService.currentUserValue;
    this.initForm();
  }

  initForm() {
    this.profileForm = this.formBuilder.group({
      firstName: [this.data[0].firstName, Validators.required],
      lastName: [this.data[0].lastName, Validators.required],
      gender: [this.data[0].gender, Validators.required],
      DOB: [this.data[0].dob, Validators.required],
      mobileNo: [this.data[0].mobileNo, [Validators.required, Validators.maxLength(10), Validators.minLength(10)]],
      email: [this.currentUser.email, [Validators.required, Validators.email]],
      profileImage: ['']
    });
  }

  get form() {
    return this.profileForm.controls;
  }

  onUpdate() {
    this.memberProfile = {
      memberTypeId: this.data[0].memberTypeId,
      memberId: this.data[0].memberId,
      userId: this.data[0].userId,
      firstName: this.form.firstName.value,
      lastName: this.form.lastName.value,
      gender: this.form.gender.value,
      dob: this.form.DOB.value,
      mobileNo: this.form.mobileNo.value,
      email: this.form.email.value
    };

    this.profileService.updateProfile(this.memberProfile).subscribe(
      data => {

      }, 
      err => {

      }
    );
  }

}
