import { TransportMode } from 'src/app/_models/transport-mode/transport-mode';
import { NotifierMsg } from './../../../constants/notifierMsg';
import { MemberPackage } from './../../../_models/package/member-package';
import { subscriptionTypeEnum } from './../../../constants/subscription-type';
import { Router } from '@angular/router';
import { MemberService } from './../../../_services/member/member.service';
import { LoaderService } from './../../../_services/loader/loader.service';
import { NotifierService } from './../../../_services/notifier/notifier.service';
import { PackageService } from './../../../_services/package/package.service';
import { Package, MemberTypePackageData } from './../../../_models/package/package';
import { MemberType } from './../../../_models/member/member-type';
import { FormErrorStateMatcher } from './../../../ErrorStateMatcher/FormErrorStateMatcher';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from 'src/app/_models/dialogData/dialogData';
import { distinctUntilChanged, switchMap } from 'rxjs/operators';
import { merge, Observable, concat } from 'rxjs';
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
  modeData: TransportMode[];
  packageData: Package;
  memberPackageData: MemberPackage;
  subType = subscriptionTypeEnum;
  keys;

  constructor(
    public dialogRef: MatDialogRef<AddPackageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private formBuilder: FormBuilder,
    private packageService: PackageService,
    private notifierService: NotifierService,
    public loader: LoaderService,
    private router: Router
  ) {
    this.keys = Object.keys(this.subType);
  }

  ngOnInit(): void {
    this.initForm();
    this.memberTypeData = this.data.member;
    this.modeData = this.data.modeData;
    this.applySubscription();
    this.applyDisable();
    if (this.data.dialogType == "Update") {
      this.setValues();
    }
  }

  initForm() {
    this.packageForm = this.formBuilder.group({
      packageId: [''],
      packageName: ['', Validators.required],
      subscriptionType: ['', Validators.required],
      total: ['', Validators.required],
      validity: [{ value: '', disabled: true }, Validators.required],
      balance: [''],
      modeType: ['', Validators.required],
      price: ['', Validators.required],
      addMember: [''],
      memberType: this.formBuilder.array([
        this.formBuilder.group({
          id: [''],
          memberTypeName: ['', Validators.required],
          discount: [''],
          startDate: [''],
          endDate: [''],
          description: ['']
        })
      ])
    });
  }

  setValues() {

    if (this.form.packageName.value == '' || this.form.packageName.value == null) {
      this.packageService.memberTypePackageObservable.subscribe(data => {

        this.form.packageId.setValue(data.id);
        this.form.packageName.setValue(data.name);
        this.form.modeType.setValue(data.transportModeId);
        this.form.subscriptionType.setValue(data.subscriptionType);
        this.form.total.setValue(data.counts);
        this.form.validity.setValue(data.validity);
        this.form.balance.setValue(data.balance);
        this.form.price.setValue(data.price);

        let len = data.memberTypePackages.length;

        for (let i = 0; i < len; i++) {
          if (i > 0) {
            const newMemberType = this.formBuilder.group({
              id: [data.memberTypePackages[i].id],
              memberTypeName: [data.memberTypePackages[i].memberTypeId, Validators.required],
              discount: [data.memberTypePackages[i].discountPercentage, Validators.required],
              startDate: [data.memberTypePackages[i].discountStartDate],
              endDate: [data.memberTypePackages[i].discountEndDate],
              description: [data.memberTypePackages[i].discountDescription]
            });
            this.member.push(newMemberType);
          } else {
            this.member.controls[i].get('id').setValue(data.memberTypePackages[i].id);
            this.member.controls[i].get('memberTypeName').setValue(data.memberTypePackages[i].memberTypeId);
            this.member.controls[i].get('discount').setValue(data.memberTypePackages[i].discountPercentage);
            this.member.controls[i].get('startDate').setValue(data.memberTypePackages[i].discountStartDate);
            this.member.controls[i].get('endDate').setValue(data.memberTypePackages[i].discountEndDate);
            this.member.controls[i].get('description').setValue(data.memberTypePackages[i].discountDescription);
          }

          this.applyDisable();
        }
      });
    }
  }

  updateMemberPackage(i: number) {
    const validStartDate = moment(this.member.controls[0].get('startDate').value).format("YYYY-MM-DD");
    const validEndDate = moment(this.member.controls[0].get('endDate').value).format("YYYY-MM-DD");
    this.memberPackageData = {
      memberTypeId: this.member.controls[i].get('memberTypeName').value,
      discountStartDate: validStartDate,
      discountEndDate: validEndDate,
      discountPercentage: this.member.controls[i].get('discount').value,
      discountDescription: this.member.controls[i].get('description').value
    }

    console.log("memberPackage");
    console.log(this.memberPackageData);
  }

  updatePackageData() {
    this.packageData = {
      id: this.form.packageId.value,
      name: this.form.packageName.value,
      transportModeId: this.form.modeType.value,
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
      if (control.get('discount').value == null || control.get('discount').value == '0' || control.get('discount').value == '') {
        control.get('discount').disable();
        control.get('description').disable();
        control.get('startDate').disable();
        control.get('endDate').disable();
      } else {
        control.get('discount').enable();
        control.get('description').enable();
        control.get('startDate').enable();
        control.get('endDate').enable();
      }
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
    this.updatePackageData();

    this.packageService.addPackage(this.packageData, this.member)
      .subscribe(
        data => {
          this.notifierService.showNotification(NotifierMsg.SuccessAddMsg('Package'), 'OK', 'success');
          this.dialogRef.close();
        },
        err => {
          if (err.status == 401 || err.stats == 403) {
            this.router.navigateByUrl('admin/login');
          } else {
            this.notifierService.showNotification(NotifierMsg.errorMsg, 'OK', 'error');
            console.log(err);
          }
          this.dialogRef.close();
        }
      );
  }

  onUpdate() {
    this.updatePackageData();

    this.packageService.deletePackage(this.form.packageId.value).pipe(switchMap((res: any) => {
      return this.packageService.addPackage(this.packageData, this.member);
    })).subscribe(
      (res) => {
        this.notifierService.showNotification(NotifierMsg.SuccessUpdateMsg('Package'), 'OK', 'success');
        this.dialogRef.close();
      },
      (err) => {
        if (err.status == 401 || err.stats == 403) {
          this.router.navigateByUrl('admin/login');
        } else {
          this.notifierService.showNotification(NotifierMsg.errorMsg, 'OK', 'error');
        }
        this.dialogRef.close();
      }
    );
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

    this.member.controls[i].get('discount').reset();
    this.member.controls[i].get('description').reset();
    this.member.controls[i].get('startDate').reset();
    this.member.controls[i].get('endDate').reset();
  }

  onAddMemberType() {
    const addMemberNo = +this.form.addMember.value;

    const newMemberType = this.formBuilder.group({
      id: [''],
      memberTypeName: ['', Validators.required],
      discount: [''],
      startDate: [''],
      endDate: [''],
      description: ['']
    });

    for (let i = 0; i < addMemberNo; i++) {
      this.member.push(newMemberType);
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
