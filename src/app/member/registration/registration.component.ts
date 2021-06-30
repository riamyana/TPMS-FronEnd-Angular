import { distinctUntilChanged } from 'rxjs/operators';
import { NotifierMsg } from 'src/app/constants/notifierMsg';
import { LoaderService } from './../../_services/loader/loader.service';
import { NotifierService } from './../../_services/notifier/notifier.service';
import { AuthenticationService } from './../../_services/authentication.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { rePassword } from 'src/app/validators/alwaysFailValidator';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  hide = true;
  hide2 = true;
  registerForm: FormGroup;
  private subscriptions: Subscription[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private notifierService: NotifierService,
    public loader: LoaderService,
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.applySubscription();
  }

  initForm() {
    this.registerForm = this.formBuilder.group({
      userName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{7,}')]],
      retype: ['', [Validators.required]]
    });
  }

  get form() {
    return this.registerForm.controls;
  }

  applySubscription() {

    this.subscriptions.push(
      this.form.retype.valueChanges.pipe(distinctUntilChanged()).subscribe(() => {
        this.checkRePassword();
      }),
      this.form.password.valueChanges.pipe(distinctUntilChanged()).subscribe(() => {
        this.checkRePassword();
      })
    );
  }

  checkRePassword() {
    this.form.retype.clearValidators();
    this.form.retype.setValidators([rePassword(this.form.password.value, 'Re-password should be same as new password'), Validators.required]);
    this.form.retype.updateValueAndValidity();
  }

  ngOnDestroy(): void {
    if (this.subscriptions && this.subscriptions.length > 0) {
      this.subscriptions.forEach(s => s.unsubscribe());
    }
  }

  register() {
    if (this.registerForm.valid) {
      const data = {
        userName: this.form.userName.value,
        email: this.form.email.value,
        password: this.form.password.value
      };

      this.authService.register(data).subscribe(
        data => {
          console.log(data);
        },
        err => {
          console.log(err);
          if (err.error.text == "Sign Up Success") {
            this.notifierService.showNotification(NotifierMsg.registerMsg("success"), "OK", "success");
          }
          else if (err.error.message == "User name already taken") {
            this.notifierService.showNotification(NotifierMsg.registerMsg("error"), "OK", "error");
          } else {
            this.notifierService.showNotification(NotifierMsg.errorMsg, "OK", "error");
          }
        }
      );
    }
  }
}
