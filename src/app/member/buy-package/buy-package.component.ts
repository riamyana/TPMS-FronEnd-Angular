import { EnrolledPackage } from './../../_models/enrolled-package';
import { EnrolledPackageService } from './../../_services/enrolled-package/enrolled-package.service';
import { NotifierService } from './../../_services/notifier/notifier.service';
import { Router } from '@angular/router';
import { AuthenticationService } from './../../_services/authentication.service';
import { UserModel } from './../../_models/userModel';
import { Pass } from './../../_models/pass';
import { PassService } from './../../_services/pass/pass.service';
import { PackageForMember } from './../../_models/packageForMember';
import { ICustomWindow, PaymentService } from './../../_services/paymentService/payment.service';
import { Component, NgZone, OnInit } from '@angular/core';
import { NotifierMsg } from 'src/app/constants/notifierMsg';
import * as moment from 'moment';

@Component({
  selector: 'app-buy-package',
  templateUrl: './buy-package.component.html',
  styleUrls: ['./buy-package.component.scss']
})
export class BuyPackageComponent implements OnInit {
  package: PackageForMember;
  pass: Pass[] = [];
  user: UserModel;
  private _window: ICustomWindow;
  public rzp: any;
  packageEnrolled: boolean = true;
  enrolledPackage: EnrolledPackage;

  constructor(
    private paymentService: PaymentService,
    private passService: PassService,
    private authService: AuthenticationService,
    private router: Router,
    private notifierService: NotifierService,
    private zone: NgZone,
    private enrolledPackageService: EnrolledPackageService
  ) {
    this.package = this.paymentService.package;
    this.user = this.authService.currentUserValue;
  }

  ngOnInit(): void {
    this.getPassDetails();
  }

  getPassDetails() {
    this.passService.getPassByUserId(this.user.id).subscribe(
      data => {
        this.pass = data;
      },
      err => {
        if (err.status == 401 || err.status == 403) {
          this.router.navigateByUrl('/user/login');
        } else {
          this.notifierService.showNotification(NotifierMsg.errorMsg, 'OK', 'error');
        }
      }
    )
  }

  onBuy() {
    this.enrolledPackageService.getEnrolledPackageByPassId(this.pass[0].passId).subscribe(
      data => {
        if (data[0].isActive == 1) {
          const today = moment().toDate();

          if (today > moment(data[0].end, 'YYYY-MM-DD').toDate()) {
            this.updateEnrolledPackage();
            alert("in");
          } else {
            this.notifierService.showNotification(NotifierMsg.packageEnrolled, 'OK', 'info');
          }
        }
      },
      err => {
        if (err.status == 401 || err.status == 403) {
          this.router.navigateByUrl('/user/login');
        } else if (err.status == 404) {
          this.packageEnrolled = false;
          this.buyPackage();
        } else {
          this.notifierService.showNotification(NotifierMsg.errorMsg, 'OK', 'error');
        }
      }
    );
  }

  updateEnrolledPackage() {
    this.enrolledPackage = {
      passId: this.pass[0].passId,
      isActive: 0
    }
    this.paymentService.updateEnrolledPackage(this.enrolledPackage).subscribe(
      data => {
        this.buyPackage();
      },
      err => {
        if (err.status == 401 || err.status == 403) {
          this.router.navigateByUrl('/user/login');
        } else if (err.status == 404) {
        } else {
          this.notifierService.showNotification(NotifierMsg.errorMsg, 'OK', 'error');
        }
      }
    )
  }

  buyPackage() {
    if (!this.packageEnrolled) {
      const that = this;
      this.paymentService.createOrder({ amount: this.package.actualPrice }).subscribe(
        data => {
          console.log(data);
          if (data.status == "created") {
            let options = {
              key: "rzp_test_7qGLAEB07PuLai", // Enter the Key ID generated from the Dashboard
              amount: data.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
              currency: "INR",
              name: `Package Buy`,
              description: `Pass Id ${this.pass[0].serialNo}`,
              image: "../../assets/TPMS_log2_background.png",
              order_id: data.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
              handler: function (response) {
                console.log(response.razorpay_payment_id);
                console.log(response.razorpay_order_id);
                console.log(response.razorpay_signature);
                alert("Payment Successfull");
                that.saveEnrolledPackage();
              },
              prefill: {
                name: "TPMS",
                email: "info.TPMS.official@gmail.com",
                contact: "8998954312"
              },
              notes: {
                address: "TPMS Office"
              },
              theme: {
                color: "#3399cc"
              }
            };

            this._window = this.paymentService.nativeWindow;

            this.rzp = new this.paymentService.nativeWindow['Razorpay'](options);
            this.rzp.on('payment.failed', function (response) {
              console.log("Oops..! Payment Failed.");
              console.log(response.error.code);
              console.log(response.error.description);
              console.log(response.error.source);
              console.log(response.error.step);
              console.log(response.error.reason);
              console.log(response.error.metadata.order_id);
              console.log(response.error.metadata.payment_id);
              that.notifierService.showNotification(NotifierMsg.paymentFailed, 'OK', 'error');
            });
            this.rzp.open();
          }
        },
        err => {
          if (err.status == 401 || err.status == 403) {
            this.router.navigateByUrl('/user/login');
          } else {
            this.notifierService.showNotification(NotifierMsg.errorMsg, 'OK', 'error');
            console.log(err);
          }
        }
      );
    } else {
      this.notifierService.showNotification(NotifierMsg.packageEnrolled, 'OK', 'err');
    }
  }

  saveEnrolledPackage() {
    this.enrolledPackage = {
      passId: this.pass[0].passId,
      packageId: this.package.id,
      isActive: 1
    }
    this.paymentService.saveEnrolledPackage(this.enrolledPackage).subscribe(
      data => {
        // this.notifierService.showNotification(NotifierMsg.successEnrolledPackage, 'OK', 'success');
        alert(NotifierMsg.successEnrolledPackage);
      },
      err => {
        if (err.status == 401 || err.status == 403) {
          this.router.navigateByUrl('/user/login');
        } else {
          this.notifierService.showNotification(NotifierMsg.errorMsg, 'OK', 'error');
        }
      }
    );
  }

}
