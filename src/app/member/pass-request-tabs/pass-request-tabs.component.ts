import { ViewPassComponent } from './../view-pass/view-pass.component';
import { StatusCategory } from './../../_models/statusCategoryEnum';
import { MemberProfileService } from './../../_services/member-profile/member-profile.service';
import { ConfirmDialogComponent } from './../../dialog/confirm-dialog/confirm-dialog.component';
import { Address } from './../../_models/address';
import { UserModel } from './../../_models/userModel';
import { AuthenticationService } from './../../_services/authentication.service';
import { MemberProfile } from './../../_models/memberProfile';
import { ProfileData } from './../../_models/profile/profileData';
import { NotifierService } from './../../_services/notifier/notifier.service';
import { NotifierMsg } from 'src/app/constants/notifierMsg';
import { PassRequestService } from './../../_services/pass-request/pass-request.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { CdkPortal } from '@angular/cdk/portal';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import * as moment from 'moment';
import { PassByMember } from 'src/app/_models/passByMemberId';

@Component({
  selector: 'app-pass-request-tabs',
  templateUrl: './pass-request-tabs.component.html',
  styleUrls: ['./pass-request-tabs.component.scss']
})
export class PassRequestTabsComponent implements OnInit {
  displayedColumns: string[] = ['requestId', 'date', 'status', 'edit'];
  dataSource: MemberProfile[];
  requested: boolean = false;
  status: string;

  public passRequestForm: FormGroup;
  private profileData: MemberProfile;
  private addressData: Address;
  private userData: UserModel;
  private passData: PassByMember;

  constructor(
    private fb: FormBuilder,
    private passRequestService: PassRequestService,
    private notifierService: NotifierService,
    private router: Router,
    public dialog: MatDialog,
    private authService: AuthenticationService,
    private memberProfileService: MemberProfileService
  ) { }

  ngOnInit(): void {
    this.userData = this.authService.currentUserValue;

    this.getStatus();
    this.intiForm();
  }

  getStatus() {
    this.memberProfileService.getMemberByUserId(this.userData.id).subscribe(
      data => {
        console.log(data);
        this.requested = true;

        this.dataSource = data;

        this.getPass();

        if (data[0].status == StatusCategory.DEFAULT) {
          this.status = 'Request Pending To Approve';
        } else if (data[0].status == StatusCategory.APPROVED) {
          this.status = 'Request Approved';
        } else if (data[0].status == StatusCategory.DISAPPROVED) {
          this.status = 'Request Not Approved';
        }
      },
      err => {
        if (err.status == 401 || err.stats == 403) {
          this.router.navigateByUrl('user/login');
        } else if (err.status == 404) {
          this.requested = false;
        }
        else {
          this.notifierService.showNotification(NotifierMsg.errorMsg, 'OK', 'error');
          console.log(err);
        }
      }
    )
  }

  getPass() {
    if (this.dataSource[0].status == StatusCategory.APPROVED) {
      this.passRequestService.getPassByMemberId(this.dataSource[0].memberId).subscribe(
        data => {
          this.passData = data[0];
          console.log(data);
        },
        err => {
  
        }
      )
    }
  }

  intiForm() {
    this.passRequestForm = this.fb.group({
      profile: this.fb.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        gender: ['', Validators.required],
        DOB: ['', Validators.required],
        mobileNo: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(10)]],
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
        proofs: this.fb.array([])

      })
    });
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
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = `Please verify all detail before submitting request.
                         Click Yes to submit.`;

    const dialogRef = this.dialog.open(ConfirmDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.sendRequest();
      }
    });
  }

  sendRequest() {
    this.profileData = {
      memberId: this.proofForm.get('requestAs').value,
      userId: this.userData.id,
      userName: this.userData.userName,
      memberTypeId: this.proofForm.get('requestAs').value,
      firstName: this.profileForm.get('firstName').value,
      lastName: this.profileForm.get('lastName').value,
      gender: this.profileForm.get('gender').value,
      mobileNo: this.profileForm.get('mobileNo').value,
      dob: this.profileForm.get('DOB').value,
      profileImage: this.profileForm.get('profileImage').value,
      requestDate: moment().format('YYYY-MM-DD')
    };

    this.addressData = {
      addLine1: this.addressForm.get('permanentAddress1').value,
      addLine2: this.addressForm.get('permanentAddress2').value,
      city: this.addressForm.get('permanentCity').value,
      zipCode: this.addressForm.get('permanentZip').value,
      postalAddLine1: this.addressForm.get('postalAddress1').value,
      postalAddLine2: this.addressForm.get('postalAddress2').value,
      postalCity: this.addressForm.get('postalCity').value,
      postalZipCode: this.addressForm.get('postalZip').value
    };

    if (this.dataSource[0].status == 2) {
      this.passRequestService.updatePassRequest(this.dataSource[0].memberId, this.profileData, this.addressData, this.proofs).subscribe(
        data => {
          this.notifierService.showNotification(NotifierMsg.SuccessAddMsg('Pass Request'), 'OK', 'success');
          this.requested = true;
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
    } else {
      this.passRequestService.passRequest(this.profileData, this.addressData, this.proofs).subscribe(
        data => {
          this.notifierService.showNotification(NotifierMsg.SuccessAddMsg('Pass Request'), 'OK', 'success');
          this.requested = true;
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
    }
  }

  onView(data: MemberProfile) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = this.passData;
    this.dialog.open(ViewPassComponent, dialogConfig);
  }

  onEdit(data: MemberProfile) {
    this.requested = false;

    this.passRequestService.getMemberProfile(data.memberId).subscribe(
      data => {
        this.profileForm.get('firstName').setValue(data[0].firstName);
        this.profileForm.get('lastName').setValue(data[0].lastName);
        this.profileForm.get('gender').setValue(data[0].gender);
        this.profileForm.get('DOB').setValue(data[0].dob);
        this.profileForm.get('mobileNo').setValue(data[0].mobileNo);
      },
      err => {
        console.log(err);
      }
    );


    this.passRequestService.getAddress(data.memberId).subscribe(
      data => {

        console.log(data);
        this.addressForm.get('permanentAddress1').setValue(data[0].addLine1),
        this.addressForm.get('permanentAddress2').setValue(data[0].addLine2),
        this.addressForm.get('permanentCity').setValue(data[0].city),
        this.addressForm.get('permanentZip').setValue(data[0].zipCode),
        this.addressForm.get('postalAddress1').setValue(data[0].postalAddLine1),
        this.addressForm.get('postalAddress1').setValue(data[0].postalAddLine2),
        this.addressForm.get('postalCity').setValue(data[0].postalCity),
        this.addressForm.get('postalZip').setValue(data[0].postalZipCode)
      },
      err => {
        console.log(err);
      }
    );
  }
}
