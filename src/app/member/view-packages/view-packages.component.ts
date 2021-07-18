import { MemberService } from './../../_services/member/member.service';
import { MemberType } from './../../_models/member/member-type';
import { NotifierMsg } from './../../constants/notifierMsg';
import { PackageForMember } from './../../_models/packageForMember';
import { Router } from '@angular/router';
import { NotifierService } from './../../_services/notifier/notifier.service';
import { AuthenticationService } from './../../_services/authentication.service';
import { UserModel } from './../../_models/userModel';
import { MemberProfileService } from './../../_services/member-profile/member-profile.service';
import { MemberProfile } from './../../_models/memberProfile';
import { subscriptionTypeEnum } from './../../constants/subscription-type';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PackageService } from './../../_services/package/package.service';
import { filter, distinctUntilChanged } from 'rxjs/operators';
import { TransportModeService } from './../../_services/transport-mode/transport-mode.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { TransportMode } from 'src/app/_models/transport-mode/transport-mode';
import { Package } from 'src/app/_models/package/package';
import { Subscription, merge } from 'rxjs';
import * as _ from 'lodash';
import * as moment from 'moment';

@Component({
  selector: 'app-view-packages',
  templateUrl: './view-packages.component.html',
  styleUrls: ['./view-packages.component.scss']
})
export class ViewPackagesComponent implements OnInit {
  private subscriptions: Subscription[] = [];
  subType = subscriptionTypeEnum;
  keys;
  discount: boolean = false;

  modes: TransportMode[] = [
    { id: 0, name: "All" }
  ];

  memberType: MemberType[] = [];
  filterForm: FormGroup;
  packages: PackageForMember[] = [];
  mode: string = 'ALL';
  packageTemp: PackageForMember[] = [];
  transportPackage: Package[] = [];
  user: UserModel;
  memberProfile: MemberProfile[] = [];

  constructor(
    private modeService: TransportModeService,
    private packageService: PackageService,
    private fb: FormBuilder,
    private memberTypeService: MemberService,
    private authService: AuthenticationService,
    private notifierService: NotifierService,
    private router: Router
  ) {
    this.keys = Object.keys(this.subType);
    this.user = this.authService.currentUserValue;
  }

  ngOnInit(): void {
    this.getAllPackages();
    this.getModes();
    this.getMemberType();
    this.initForm();
    this.applySubscription();
  }

  getModes() {
    this.modeService.getTransportModes().subscribe(
      data => {
        this.modes = this.modes.concat(data);
      },
      err => {
        if (err.status == 401 || err.status == 403) {

        } else if (err.status == 404) {

        } else {
          this.notifierService.showNotification(NotifierMsg.errorMsg, 'OK', 'error');
        }
      }
    )
  }

  getMemberType() {
    this.memberTypeService.getMemberType().subscribe(
      data => {
        this.memberType = data;
      },
      err => {
        if (err.status == 401 || err.stats == 403) {
          this.router.navigateByUrl('admin/login');
        } else {
          this.notifierService.showNotification('Something went wrong..! Please try again.', 'OK', 'error');
        }
      });
  }

  getAllPackages() {
    this.packages = [];
    this.packageService.getPackagesForMember().subscribe(
      data => {
        this.packages = this.packages.concat(data);
        this.packageTemp = this.packages;
        // const adultId = this.memberType.filter(value => value.memberTypeName == "Adult").map(value => value.memberTypeId);

        this.packages.forEach(value => {
          const today = moment().toDate();
          if (value.discountPercentage && today >= moment(value.discountStartDate,'YYYY-MM-DD').toDate() && today <= moment(value.discountEndDate,'YYYY-MM-DD').toDate()) {
            value.discount = true;
            value.actualPrice = Math.round(value.price - ((value.discountPercentage * value.price)/100));
            // alert(value.actualPrice);
          } else {
            value.discount = false;
          }
        });

        // this.packages = this.packages.filter(value => value.memberTypeId == adultId[0]);
      },
      err => {
        console.log(err);
        if (err.status == 401 || err.status == 403) {
          this.router.navigateByUrl('user/login');
        } else if (err.status == 404) {
          
        } else {
          this.notifierService.showNotification(NotifierMsg.errorMsg, 'OK', 'error');
        }
      }
    );
  }

  initForm() {
    this.filterForm = this.fb.group({
      subscription: [''],
      price: [''],
      memberTypeId: ['']
    });
  }

  get form() {
    return this.filterForm.controls;
  }

  applySubscription() {
    this.subscriptions.push(
      merge(
        this.form.subscription.valueChanges.pipe(distinctUntilChanged()),
        this.form.price.valueChanges.pipe(distinctUntilChanged()),
        this.form.memberTypeId.valueChanges.pipe(distinctUntilChanged())
      ).subscribe(() => {
        this.filterPackage();
      })
    );
  }

  filterPackage() {
    this.mode = "";
    this.packages = this.packageTemp;
    const subscription = this.form.subscription.value;
    const price: string = this.form.price.value;
    const memberTypeId = this.form.memberTypeId.value;
    if (subscription) {
      this.packages = this.packages.filter(value => value.subscriptionType == subscription);
    }
    if (price) {
      const split = price.split("-");
      this.packages = this.packages.filter(value => {
        if (split[1]) {
          return value.price <= +split[1] && value.price >= +split[0];
        } else {
          return value.price > +split[0];
        }
      });
    }

    if (memberTypeId) {
      this.packages = this.packages.filter(value => value.memberTypeId == +memberTypeId);
    }
  }

  getModePackage(mode: string, i: number) {

    if (this.mode == mode.toUpperCase()) {
      return;
    }

    this.form.memberTypeId.setValue('');

    this.mode = mode.toUpperCase();
    this.transportPackage = [];
    this.packages = this.packageTemp;

    if (mode.toUpperCase() == "ALL") {
      return;
    }
    
    console.log(this.packages);
    this.packages = this.packages.filter(value => value.transportMode.toLowerCase() == mode.toLowerCase());

    console.log(this.packages);
  }

  ngOnDestroy() {
    if (this.subscriptions && this.subscriptions.length > 0) {
      this.subscriptions.forEach(s => s.unsubscribe());
    }
  }

}
