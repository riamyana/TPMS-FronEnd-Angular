import { Address } from './../../_models/address';
import { UserModel } from './../../_models/userModel';
import { AuthenticationService } from './../../_services/authentication.service';
import { MemberProfile } from './../../_models/memberProfile';
import { ProfileData } from './../../_models/profile/profileData';
import { NotifierService } from './../../_services/notifier/notifier.service';
import { NotifierMsg } from 'src/app/constants/notifierMsg';
import { PassRequestService } from './../../_services/pass-request/pass-request.service';
import { Router } from '@angular/router';
import { FormGroup, ControlContainer, FormGroupDirective, FormBuilder, Validators, FormArray } from '@angular/forms';
import { CdkPortal } from '@angular/cdk/portal';
import { Component, Injector, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-pass-request-tabs',
  templateUrl: './pass-request-tabs.component.html',
  styleUrls: ['./pass-request-tabs.component.scss']
})
export class PassRequestTabsComponent implements OnInit {

  public passRequestForm: FormGroup;
  private profileData: MemberProfile;
  private addressData: Address;
  private userData: UserModel;

  constructor(
    private fb: FormBuilder,
    private passRequestService: PassRequestService,
    private notifierService: NotifierService,
    private router: Router,
    private authService: AuthenticationService
  ) { }

  ngOnInit(): void {
    this.passRequestForm = this.fb.group({
      profile: this.fb.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        gender: ['', Validators.required],
        DOB: ['', Validators.required],
        mobileNo: ['', Validators.required],
        profileImage: ['']
      }),
      addressGroup: this.fb.group({
        permanentAddress1: ['', Validators.required],
        permanentAddress2: [''],
        permanentCity: ['', Validators.required],
        permanentZip: ['', [Validators.required, Validators.maxLength(10)]],
        sameInd: [''],
        postalAddress1: ['', Validators.required],
        postalAddress2: [''],
        postalCity: ['', Validators.required],
        postalZip: ['', [Validators.required, Validators.maxLength(10)]]
      }),
      proofGroup: this.fb.group({
        requestAs: ['', Validators.required],
        proofs: this.fb.array([
          // this.fb.group({
          //   proofId: ['', Validators.required],
          //   proofName: ['', Validators.required]
          // })
        ])
      })
    });

    this.userData = this.authService.currentUserValue;
  }

  get profileForm() {
    return this.passRequestForm.get('profile') as FormGroup;
  }

  get addressForm() {
    return this.passRequestForm.get('addressGroup') as FormGroup;
  }

  get proofForm() {
    return this.passRequestForm.get('proofGroup') as FormGroup;
  }

  get proofs() {
    return this.proofForm.get('proofs') as FormArray;
  }

  submit() {
    // alert(this.profileForm.get('firstName').value);
    // alert(this.proofs.controls[0].get('proofName').value);
    this.profileData = {
      userId: this.userData.id,
      memberTypeId: this.proofForm.get('requestAs').value,
      firstName: this.profileForm.get('firstName').value,
      lastName: this.profileForm.get('lastName').value,
      gender: this.profileForm.get('gender').value,
      mobileNo: this.profileForm.get('mobileNo').value,
      dob: this.profileForm.get('DOB').value,
      profileImage: this.profileForm.get('profileImage').value
    };

    alert(this.profileForm.get('DOB').value);
    alert(this.profileForm.get('profileImage').value);

    this.addressData = {
      memberId: 1,
      addLine1: this.addressForm.get('permanentAddress1').value,
      addLine2: this.addressForm.get('permanentAddress2').value,
      city: this.addressForm.get('permanentCity').value,
      zipCode: this.addressForm.get('permanentZip').value,
      postalAddLine1: this.addressForm.get('postalAddress1').value,
      postalAddLine2: this.addressForm.get('postalAddress1').value,
      postalCity: this.addressForm.get('postalCity').value,
      postalZipCode: this.addressForm.get('postalZip').value
    };

    // this.passRequestService.addMemberProfile(this.profileData).subscribe(
    //   data => {
    //     this.notifierService.showNotification(NotifierMsg.SuccessAddMsg('Member Profile'), 'OK', 'success');
    //   },
    //   err => {
    //     if (err.status == 401 || err.stats == 403) {
    //       this.router.navigateByUrl('user/login');
    //     }
    //     else {
    //       this.notifierService.showNotification(NotifierMsg.errorMsg, 'OK', 'error');
    //     }
    //   });

    this.passRequestService.passRequest(this.profileData, this.addressData, this.proofs).subscribe(
      data => {
        this.notifierService.showNotification(NotifierMsg.SuccessAddMsg('Pass Request'), 'OK', 'success');
      },
      err => {
        if (err.status == 401 || err.stats == 403) {
          this.router.navigateByUrl('user/login');
        }
        else {
          this.notifierService.showNotification(NotifierMsg.errorMsg, 'OK', 'error');
          console.log(err);
        }
      });

      // this.passRequestService.addAddress(this.addressData).subscribe(
      //   data => {
      //     this.notifierService.showNotification(NotifierMsg.SuccessAddMsg('Member Profile'), 'OK', 'success');
      //   },
      //   err => {
      //     if (err.status == 401 || err.stats == 403) {
      //       this.router.navigateByUrl('user/login');
      //     }
      //     else {
      //       this.notifierService.showNotification(NotifierMsg.errorMsg, 'OK', 'error');
      //     }
      //   });
  }

}
