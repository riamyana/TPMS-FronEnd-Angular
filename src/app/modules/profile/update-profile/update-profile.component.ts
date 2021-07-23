import { ProfileData } from './../../../_models/profile/profileData';
import { ProfileService } from './../../../_services/profile/profile.service';
import { AuthenticationService } from './../../../_services/authentication.service';
import { UserModel } from './../../../_models/userModel';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MemberProfile } from './../../../_models/memberProfile';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.scss']
})
export class UpdateProfileComponent implements OnInit {
  profileForm: FormGroup;
  currentUser: UserModel;
  memberProfile: UserModel;
  imageUrl: String | ArrayBuffer = "../../../../assets/undraw_profile_pic_ic5t.svg";
  fileToUpload: File;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: MemberProfile[],
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private dialogRef: MatDialogRef<any>
  ) { }

  ngOnInit(): void {
    this.currentUser = this.authService.currentUserValue;
    this.initForm();

    if (this.currentUser.profileImage)
      this.imageUrl = `http://localhost:8080/image/${this.currentUser.profileImage}`;
  }

  initForm() {
    this.profileForm = this.formBuilder.group({
      // firstName: [this.data[0].firstName, Validators.required],
      // lastName: [this.data[0].lastName, Validators.required],
      // gender: [this.data[0].gender, Validators.required],
      // DOB: [this.data[0].dob, Validators.required],
      // mobileNo: [this.data[0].mobileNo, [Validators.required, Validators.maxLength(10), Validators.minLength(10)]],
      // email: [this.currentUser.email, [Validators.required, Validators.email]],
      // profileImage: ['']

      email: [this.currentUser.email, [Validators.required, Validators.email]],
      profileImage: [this.currentUser.profileImage]
    });

    if (this.currentUser.profileImage) {
      this.imageUrl = `http://localhost:8080/image/${this.currentUser.profileImage}`;
    }
  }

  get form() {
    return this.profileForm.controls;
  }

  onUpdate() {
    const email = this.form.email.value;
    const userName = this.currentUser.userName;

    // this.authService.updateProfile(email, this.fileToUpload, userName).subscribe(
    //   data => {
    //     this.currentUser.profileImage = data.profileImage;
    //     this.currentUser.email = data.email;
    //     alert(data.email);
        // this.authService.currentUserSubject.next(this.currentUser);
    //     localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
    //     this.dialogRef.close(data);
    //   },
    //   err => {
    //     console.log(err);
    //     this.dialogRef.close(false);
    //   }
    // );
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
