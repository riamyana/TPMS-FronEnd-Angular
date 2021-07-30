import { ForgtoPassword } from './../../../_models/forgot-password';
import { EncrDecrService } from './../../../_services/encrDecrService/encr-decr.service';
import { LoaderService } from './../../../_services/loader/loader.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NotifierMsg } from './../../../constants/notifierMsg';
import { NotifierService } from './../../../_services/notifier/notifier.service';
import { ForgotPasswordService } from './../../../_services/forgot-password/forgot-password.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss']
})
export class OtpComponent implements OnInit {
  otpForm: FormGroup;
  userName: string;
  routeParams;
  msg: string = "OTP sent successfully to your registered email address..!";

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private service: ForgotPasswordService,
    private notifierService: NotifierService,
    private router: Router,
    public loader: LoaderService,
    private encrDecrService: EncrDecrService
  ) { }

  ngOnInit(): void {
    this.routeParams = this.route.snapshot.paramMap;
    this.userName = this.encrDecrService.get('123456$#@$^@1ERF', this.routeParams.get('userName'));

    this.otpForm = this.formBuilder.group({
      otp: ['', Validators.required]
    });
  }

  onValidate() {
    if (this.otpForm.valid) {
      const otp = this.otpForm.get('otp').value;
      this.service.otp = this.otpForm.get('otp').value;

      const data: ForgtoPassword = {
        userName: this.userName,
        otp: otp
      };

      const user_type = this.service.role;

      this.service.validateOTP().subscribe(
        data => {
          console.log(data);
          if (data.message == "Success") {
            const encryptedUserName = this.routeParams.get('userName');
            const encryptedOTP = this.encrDecrService.set('123456$#@$^@1ERF', otp);
            // this.router.navigateByUrl(`forgot-password/${encryptedUserName}/${encryptedOTP}`);
            this.router.navigateByUrl(`${user_type}/forgot-password/otp/change-password`);
          } else if (data.message == "Failure") {
            this.msg = "OTP is invalid..!"
          }
        },
        err => {
          if (err.status == 401 || err.stats == 403) {
            this.router.navigateByUrl('user/login');
          }
          else {
            this.notifierService.showNotification(NotifierMsg.errorMsg, 'OK', 'error');
            console.log(err);
          }
        });
    }
  }

}
