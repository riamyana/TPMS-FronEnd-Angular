import { EncrDecrService } from './../../_services/encrDecrService/encr-decr.service';
import { LoaderService } from './../../_services/loader/loader.service';
import { NotifierMsg } from 'src/app/constants/notifierMsg';
import { NotifierService } from './../../_services/notifier/notifier.service';
import { ForgotPasswordService } from './../../_services/forgot-password/forgot-password.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  forgotPasswordForm: FormGroup;
  msg: string;
  userName: string;

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
    const routeParams = this.route.snapshot.paramMap;
    this.userName = routeParams.get('userName');

    this.forgotPasswordForm = this.formBuilder.group({
      userName: ['', Validators.required]
    });
  }

  sendOTP() {

    if (this.forgotPasswordForm.valid) {
      const userName = this.forgotPasswordForm.get('userName').value;

      this.service.sendOTP(userName).subscribe(
        data => {
          this.msg = "OTP sent successfully to your registered email address..!";
          const encryptedUserName = this.encrDecrService.set('123456$#@$^@1ERF', userName);
          this.router.navigateByUrl(`forgot-password/${encryptedUserName}`);
          // console.log(encrypted);
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
    }
  }

  onResendOTP() {
    this.sendOTP();
  }

}
