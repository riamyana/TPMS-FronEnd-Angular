import { LoaderService } from './../../_services/loader/loader.service';
import { BehaviorSubject } from 'rxjs';
import { NotifierMsg } from 'src/app/constants/notifierMsg';
import { EnrolledPackage } from './../../_models/enrolled-package';
import { EnrolledPackageService } from './../../_services/enrolled-package/enrolled-package.service';
import { NotifierService } from './../../_services/notifier/notifier.service';
import { Router } from '@angular/router';
import { AuthenticationService } from './../../_services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/app/_models/userModel';

@Component({
  selector: 'app-enrolled-package',
  templateUrl: './enrolled-package.component.html',
  styleUrls: ['./enrolled-package.component.scss']
})
export class EnrolledPackageComponent implements OnInit {
  user: UserModel;
  enrolledPackage: BehaviorSubject<EnrolledPackage[]> = new BehaviorSubject(null);

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private notifierService: NotifierService,
    private enrolledPackageService: EnrolledPackageService,
    public loader: LoaderService
  ) { 
    this.user = this.authService.currentUserValue;
  }

  ngOnInit(): void {
    this.getEnrolledPackageDetails();
  }

  get enrolledPackageValue() {
    return this.enrolledPackage.value;
  }

  getEnrolledPackageDetails() {
    this.enrolledPackageService.getEnrolledPckDetailsByUserId(this.user.id).subscribe(
      data => {
        this.enrolledPackage.next(data);
      },
      err => {
        if (err.status == 401 || err.status == 403) {
          this.router.navigateByUrl('/user/login');
        } else if (err.status == 404) {
        } else {
          this.notifierService.showNotification(NotifierMsg.errorMsg, 'OK', 'error');
        }
      }
    );
  }

}
