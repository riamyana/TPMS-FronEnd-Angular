import { FormErrorStateMatcher } from './../../ErrorStateMatcher/FormErrorStateMatcher';
import { NotifierService } from './../../_services/notifier/notifier.service';
import { LoaderService } from './../../_services/loader/loader.service';
import { Roles } from './../../constants/roles';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from './../../_services/authentication.service';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { first } from 'rxjs/operators';

// export class LoginErrorStateMatcher implements ErrorStateMatcher {
//   isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
//     const isSubmitted = form && form.submitted;
//     return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
//   }
// }
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @Input() user_type;
  loginForm: FormGroup;
  returnUrl: string;
  error = '';
  matcher = new FormErrorStateMatcher();
  hide = true;

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router,
    public loader: LoaderService,
    private notifierService: NotifierService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });

    console.log(this.loginForm.get('userName').hasError('requried'));

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

    this.authenticationService.logout();

    // alert(this.user_type);
  }

  get form() {
    return this.loginForm.controls;
  }

  async onSubmit() {
    // this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    console.log(this.loginForm.get('userName'));
    // const loginModel: LoginModel = new LoginModel(this.form.userName.value, this.form.password.value);

    // this.loading = true;
    this.authenticationService.login(this.form.userName.value, this.form.password.value, Roles.ADMIN)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigateByUrl('admin/manage-member');
          // console.log(data);
        },
        error => {
          if (error.status == 401 || error.status == 403) {
            this.error = error;
            this.notifierService.showNotification('Invalid credentials', 'OK', 'error');
          } else {
            this.error = error;
            this.notifierService.showNotification('Something went wrong, Please try again later..!', 'OK', 'error');
          }
        });
    this.authenticationService.isLoggedIn();
  }

}
