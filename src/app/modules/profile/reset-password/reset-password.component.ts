import { FormErrorStateMatcher } from './../../../ErrorStateMatcher/FormErrorStateMatcher';
import { ErrorMsg } from './../../../constants/errorMsg';
import { distinctUntilChanged } from 'rxjs/operators';
import { MatDialogRef } from '@angular/material/dialog';
import { ChangePassword } from './../../../_models/profile/changePassword';
import { AuthenticationService } from './../../../_services/authentication.service';
import { Router } from '@angular/router';
import { NotifierService } from './../../../_services/notifier/notifier.service';
import { LoaderService } from './../../../_services/loader/loader.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { NotifierMsg } from 'src/app/constants/notifierMsg';
import { alwaysFailValidator, blue, rePassword } from 'src/app/validators/alwaysFailValidator';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm: FormGroup;
  data: ChangePassword;
  msg = ErrorMsg.newPasswordErrorMsg;
  matcher = new FormErrorStateMatcher();

  constructor(
    private formBuilder: FormBuilder,
    public loader: LoaderService,
    private notifierService: NotifierService,
    private router: Router,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.applySubscription();
  }

  initForm() {
    this.resetPasswordForm = this.formBuilder.group({
      old: ['', Validators.required],
      newpass: ['', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{7,}')]],
      retype: ['', [Validators.required]]
    });
  }

  get form() {
    return this.resetPasswordForm.controls;
  }

  applySubscription() {
    this.form.retype.valueChanges.subscribe(() => {
      this.checkRePassword();
    });

    this.form.newpass.valueChanges.subscribe(() => {
      this.checkRePassword();
    });

    // this.form.newpass.valueChanges.pipe(distinctUntilChanged()).subscribe((value) => {
    //   this.passwordPattern(value);
    // });
  }

  passwordPattern(value: string) {
    if (/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{7,}/.test(value)) {
      this.form.newpass.clearValidators();
    } else {
      this.form.newpass.setValidators([Validators.pattern('password')]);
    }

    this.form.newpass.updateValueAndValidity();
  }

  checkRePassword() {
    this.form.retype.clearValidators();
    this.form.retype.setValidators([rePassword(this.form.newpass.value, 'Re-password should be same as new password'), Validators.required]);
    this.form.retype.updateValueAndValidity();
  }

  resetPassword() {
    if (this.form.newpass.value != this.form.retype.value) {
      this.form.retype.clearValidators();
      this.form.retype.setValidators([rePassword(this.form.newpass.value, 'Re-password should be same as new password'), Validators.required]);
      this.form.newpass.updateValueAndValidity();
      return;
    }

    if (this.resetPasswordForm.invalid) {
      return;
    }

    // alert("hello");

    this.setData();

    this.authenticationService.changePassword(this.data).subscribe(
      data => {},
      err => {
        if (err.error.text == "Password changed successfully") {
          this.notifierService.showNotification(NotifierMsg.ChangePasswordMsg("success"), 'OK', 'success');
        } else if ((err.status == 401 || err.status == 403) && err.error.message == "Password is not correct") {
          this.notifierService.showNotification(NotifierMsg.ChangePasswordMsg("incorrect"), 'OK', 'error');
        } else if(err.status == 401 || err.status == 403) {
          this.router.navigateByUrl('admin/login');
        } else {
          this.notifierService.showNotification(NotifierMsg.errorMsg, 'OK', 'error');
          console.log(err.error);
        }
      });
  }

  setData() {
    this.data = {
      oldPassword: this.form.old.value,
      newPassword: this.form.retype.value
    }
  }

  onReset() {
    this.resetPasswordForm.reset();
  }

}
