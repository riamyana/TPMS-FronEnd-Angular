import { subscriptionTypeEnum } from './../../../constants/subscription-type';
import { SubscriptionType } from './../../../_models/subscription-type/subscription-type';
import { Router } from '@angular/router';
import { MemberService } from './../../../_services/member/member.service';
import { LoaderService } from './../../../_services/loader/loader.service';
import { NotifierService } from './../../../_services/notifier/notifier.service';
import { PackageService } from './../../../_services/package/package.service';
import { Package } from './../../../_models/package/package';
import { MemberType } from './../../../_models/member/member-type';
import { FormErrorStateMatcher } from './../../../ErrorStateMatcher/FormErrorStateMatcher';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from 'src/app/_models/dialogData/dialogData';
import { distinctUntilChanged } from 'rxjs/operators';
import { merge } from 'rxjs';
import * as moment from 'moment';

@Component({
  selector: 'app-add-package',
  templateUrl: './add-package.component.html',
  styleUrls: ['./add-package.component.scss']
})
export class AddPackageComponent implements OnInit {
  packageForm: FormGroup;
  matcher = new FormErrorStateMatcher();
  memberTypeData: MemberType[];
  packageData: Package;
  subType = subscriptionTypeEnum;
  keys;

  constructor(
    public dialogRef: MatDialogRef<AddPackageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private formBuilder: FormBuilder,
    private packageService: PackageService,
    private notifierService: NotifierService,
    public loader: LoaderService,
    private memberService: MemberService,
    private router: Router
  ) {
    this.keys = Object.keys(this.subType);
  }

  ngOnInit(): void {
    this.initForm();
    this.memberTypeData = this.data.member;
    this.applySubscription();
    this.applyDisable();
  }

  initForm() {
    this.packageForm = this.formBuilder.group({
      packageName: ['', Validators.required],
      subscriptionType: ['', Validators.required],
      total: ['', Validators.required],
      validity: [{ value: '', disabled: true }, Validators.required],
      balance: ['', Validators.required],
      price: ['', Validators.required],
      addMember: [''],
      memberType: this.formBuilder.array([
        this.formBuilder.group({
          memberTypeName: ['', Validators.required],
          discount: ['', Validators.required],
          startDate: [''],
          endDate: [''],
          description: ['']
        })
      ])
    });
  }

  updatePackageData() {
    this.packageData = {
      name: this.form.packageName.value,
      subscriptionType: this.form.subscriptionType.value,
      counts: this.form.total.value,
      validity: this.form.validity.value,
      balance: this.form.balance.value,
      price: this.form.price.value
    }
  }

  applyDisable() {
    this.form.validity.disable();
    for (let control of this.member.controls) {
      control.get('discount').disable();
      control.get('description').disable();
      control.get('startDate').disable();
      control.get('endDate').disable();
    }
  }

  applySubscription() {
    merge(
      this.form.subscriptionType.valueChanges.pipe(distinctUntilChanged()),
      this.form.total.valueChanges.pipe(distinctUntilChanged())
    ).subscribe(() => this.updateValidity());
  }

  updateValidity() {
    if (this.form.subscriptionType.value && this.form.total.value) {
      const sub = this.form.subscriptionType.value;
      const type = this.form.subscriptionType.value;

      console.log(type);
      const count = +this.form.total.value;
      switch (type) {
        case 'Monthly': {
          this.form.validity.setValue(count * 30);
          break;
        }
        case 'Yearly': {
          this.form.validity.setValue(count * 365);
          break;
        }
        case 'Quarterly': {
          this.form.validity.setValue(count * 90);
          break;
        }
        case 'Half-Quarterly': {
          this.form.validity.setValue(count * 45);
          break;
        }

      }
    }
  }

  get form() {
    return this.packageForm.controls;
  }

  get member() {
    return this.packageForm.get('memberType') as FormArray;
  }

  onAdd() {
    this.addPackage();
    // this.packageService.addPackage(this.packageData).subscribe(
    //   data => {
    //     // console.log(data);
    //     this.notifierService.showNotification('Member Type Added Successfully', 'OK', 'success');
    //     this.dialogRef.close(data);
    //   },
    //   err => {
    //     this.notifierService.showNotification('Something went wrong..! Please try again.', 'OK', 'error');
    //     console.log(err);
    //     // this.dialogRef.close();
    //   });
  }

  addPackage() {
    this.updatePackageData();
    this.packageService.addPackage(this.packageData).subscribe(
      data => {
        console.log(data);
        // this.notifierService.showNotification('Member Type Added Successfully', 'OK', 'success');
      },
      err => {
        this.notifierService.showNotification('Something went wrong..! Please try again.', 'OK', 'error');
        console.log(err);
      });
  }

  onCancel() {
    this.dialogRef.close();
  }

  onAddDiscount(i: number) {
    this.member.controls[i].get('discount').enable();
    this.member.controls[i].get('description').enable();
    this.member.controls[i].get('startDate').enable();
    this.member.controls[i].get('endDate').enable();
  }

  onDiscountDelete(i: number) {
    this.member.controls[i].get('discount').disable();
    this.member.controls[i].get('description').disable();
    this.member.controls[i].get('startDate').disable();
    this.member.controls[i].get('endDate').disable();
  }

  onAddMemberType() {
    const addProofNo = +this.form.addMember.value;

    const newProof = this.formBuilder.group({
      memberTypeName: ['', Validators.required],
      discount: ['', Validators.required],
      startDate: [''],
      endDate: [''],
      description: ['']
    });

    for (let i = 0; i < addProofNo; i++) {
      this.member.push(newProof);
    }

    this.applyDisable();
  }

  onDeleteMember(i: number) {
    this.member.controls[i].get('memberTypeName').disable();
    this.member.controls[i].get('discount').disable();
    this.member.controls[i].get('description').disable();
    this.member.controls[i].get('startDate').disable();
    this.member.controls[i].get('endDate').disable();
  }

}
