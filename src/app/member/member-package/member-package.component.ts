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
import { NotifierMsg } from 'src/app/constants/notifierMsg';
import * as _ from 'lodash';

@Component({
  selector: 'app-member-package',
  templateUrl: './member-package.component.html',
  styleUrls: ['./member-package.component.scss']
})
export class MemberPackageComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription[] = [];
  subType = subscriptionTypeEnum;
  keys;
  noPass: boolean = false;

  modes: TransportMode[] = [
    { id: 0, name: "All" }
  ];

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
    private memberService: MemberProfileService,
    private authService: AuthenticationService,
    private notifierService: NotifierService,
    private router: Router
  ) {
    this.keys = Object.keys(this.subType);
    this.user = this.authService.currentUserValue;
  }

  ngOnInit(): void {
    this.checkForPass();
    // this.getModes();
    this.initForm();
    this.applySubscription();
  }

  checkForPass() {
    this.memberService.getMemberByUserId(this.user.id).subscribe(
      data => {
        this.memberProfile = data;
        if (data[0].status == 1) {
          this.noPass = false;
          this.getAllPackages();
          this.getModes();
        } else {
          this.noPass = true;
        }
      },
      err => {
        if (err.status == 401 || err.status == 403) {
          this.router.navigateByUrl('/user/login');
        } else if (err.status == 404) {
          this.noPass = true;
        } else {
          this.notifierService.showNotification(NotifierMsg.errorMsg, 'OK', 'error');
        }
      }
    );
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

        }
      }
    )
  }

  getAllPackages() {
    this.packages = [];
    this.packageService.getPackagesForMember(this.memberProfile[0].memberTypeId).subscribe(
      data => {
        this.packages = this.packages.concat(data);
        this.packageTemp = this.packages;
        console.log(data);
        console.log(this.packages);
      },
      err => {
        if (err.status == 401 || err.status == 403) {
          this.router.navigateByUrl('user/login');
        } else if (err.status == 404) {
          
        } else {

        }
      }
    );
  }

  initForm() {
    this.filterForm = this.fb.group({
      subscription: [''],
      price: ['']
    });
  }

  get form() {
    return this.filterForm.controls;
  }

  applySubscription() {
    this.subscriptions.push(
      merge(
        this.form.subscription.valueChanges.pipe(distinctUntilChanged()),
        this.form.price.valueChanges.pipe(distinctUntilChanged())
      ).subscribe(() => {
        this.filterPackage();
      })
    );
  }

  filterPackage() {
    debugger;
    this.packages = this.packageTemp;
    const subscription = this.form.subscription.value;
    const price: string = this.form.price.value;
    if (subscription) {
      console.log(this.packages);
      this.packages = this.packages.filter(value => value.subscriptionType == subscription);
      console.log(this.packages);
    }
    if (price) {
      const split = price.split("-");
      debugger;
      this.packages = this.packages.filter(value => {
        if (split[1]) {
          return value.price <= +split[1] && value.price >= +split[0];
        } else {
          return value.price > +split[0];
        }
      });
    }
  }

  getModePackage(mode: string, i: number) {

    if (this.mode == mode.toUpperCase()) {
      return;
    }

    this.mode = mode.toUpperCase();
    this.transportPackage = [];
    this.packages = this.packageTemp;

    if (mode.toUpperCase() == "ALL") {
      this.getAllPackages();
      return;
    }

    this.packageService.getModePackages(this.modes[i].id).subscribe(
      data => {
        this.transportPackage = this.transportPackage.concat(data);
        let modePackageid: number[] = [];
        let packageid: number[] = [];

        // modePackageid = this.transportPackage.map(value => value.id);
        // packageid = this.packages.map(value => value.id);

        // packageid = _.intersection(modePackageid, packageid);

      },
      err => {
        if (err.status == 401 || err.status == 403) {
          this.router.navigateByUrl('user/login');
        } else if (err.status == 404) {
          this.transportPackage = [];
        } else {

        }
      }
    );

    console.log(this.transportPackage);
    this.packages = [];
    for (let i = 0; i < this.packageTemp.length; i++) {
      if (this.packageTemp[i].id == this.transportPackage[i].id) {
        this.packages.push(this.packageTemp[i]);
      }
    }
  }

  ngOnDestroy() {
    if (this.subscriptions && this.subscriptions.length > 0) {
      this.subscriptions.forEach(s => s.unsubscribe());
    }
  }

}
