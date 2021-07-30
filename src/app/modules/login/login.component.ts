import { FormErrorStateMatcher } from './../../ErrorStateMatcher/FormErrorStateMatcher';
import { NotifierService } from './../../_services/notifier/notifier.service';
import { LoaderService } from './../../_services/loader/loader.service';
import { Roles } from './../../constants/roles';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from './../../_services/authentication.service';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @Input() user_type: string;
  role = Roles;
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
  }

  get form() {
    return this.loginForm.controls;
  }

  async onSubmit() {

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    console.log(this.loginForm.get('userName'));
    // const loginModel: LoginModel = new LoginModel(this.form.userName.value, this.form.password.value);
    
    this.authenticationService.login(this.form.userName.value, this.form.password.value)
      .pipe(first())
      .subscribe(
        data => {
          if (this.user_type == Roles.ADMIN)
            this.router.navigateByUrl('admin/dashboard');
          else if (this.user_type == Roles.USER)
            this.router.navigateByUrl('user/view-package');
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
