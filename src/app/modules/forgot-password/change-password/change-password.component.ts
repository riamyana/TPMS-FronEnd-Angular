import { distinctUntilChanged } from 'rxjs/operators';
import { rePassword } from 'src/app/validators/alwaysFailValidator';
import { NotifierMsg } from './../../../constants/notifierMsg';
import { ForgtoPassword } from './../../../_models/forgot-password';
import { EncrDecrService } from './../../../_services/encrDecrService/encr-decr.service';
import { LoaderService } from './../../../_services/loader/loader.service';
import { NotifierService } from './../../../_services/notifier/notifier.service';
import { ForgotPasswordService } from './../../../_services/forgot-password/forgot-password.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  msg: string;
  changePasswordForm: FormGroup;
  userName: string;
  otp: number;
  routeParams;
  private subscriptions: Subscription[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private service: ForgotPasswordService,
    private router: Router,
    private notifierService: NotifierService,
    public loader: LoaderService,
    private encrDecrService: EncrDecrService
  ) { }

  ngOnInit(): void {
    this.routeParams = this.route.snapshot.paramMap;
    this.userName = this.encrDecrService.get('123456$#@$^@1ERF', this.routeParams.get('userName'));
    this.otp = this.encrDecrService.get('123456$#@$^@1ERF', this.routeParams.get('otp'));

    this.changePasswordForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{7,}')]],
      confirmPassword: ['', Validators.required]
    });

    this.applySubscription();
  }

  get form() {
    return this.changePasswordForm.controls;
  }

  applySubscription() {

    this.subscriptions.push(
      this.form.confirmPassword.valueChanges.pipe(distinctUntilChanged()).subscribe(() => {
        this.checkRePassword();
      }),
      this.form.password.valueChanges.pipe(distinctUntilChanged()).subscribe(() => {
        this.checkRePassword();
      })
    );

    // this.form.newpass.valueChanges.pipe(distinctUntilChanged()).subscribe((value) => {
    //   this.passwordPattern(value);
    // });
  }

  checkRePassword() {
    this.form.confirmPassword.clearValidators();
    this.form.confirmPassword.setValidators([rePassword(this.form.password.value, 'Re-password should be same as new password'), Validators.required]);
    this.form.confirmPassword.updateValueAndValidity();
  }

  changePassword() {

    if (!this.service.otp || !this.service.userName) {
      this.msg = "An error occured during authorization. Please try again later..!";
      return;
    }

    if (this.changePasswordForm.valid) {
      const data: ForgtoPassword = {
        userName: this.service.userName,
        otp: this.service.otp,
        newPassword: this.changePasswordForm.get('password').value
      };

      const newPassword = this.changePasswordForm.get('password').value
      this.service.changePassword(newPassword).subscribe(
        data => {
          if (data.message == "Success") {
            this.notifierService.showNotification(NotifierMsg.ChangePasswordMsg('success'), 'OK', 'success');
          } else {
            this.msg = "An error occured during authorization. Please try again later..!";
          }
        },
        err => {
          if (err.error.text == "Success") {
            this.msg = "OTP sent successfully to your registered email address..!";
          } else if (err.status == 401 || err.stats == 403) {
            this.router.navigateByUrl('user/login');
          }
          else {
            this.notifierService.showNotification(NotifierMsg.errorMsg, 'OK', 'error');
            console.log(err);
          }
        });

      this.service.userName = null;
      this.service.otp = null;
    }
  }

}
