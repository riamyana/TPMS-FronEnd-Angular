import { LoaderService } from './../../../_services/loader/loader.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { ProfileData } from './../../../_models/profile/profileData';
import { NotifierMsg } from './../../../constants/notifierMsg';
import { NotifierService } from './../../../_services/notifier/notifier.service';
import { Router } from '@angular/router';
import { ProfileService } from './../../../_services/profile/profile.service';
import { SideNavService } from './../../../_services/side-nav/side-nav.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit {

  profileData: BehaviorSubject<ProfileData[]> = new BehaviorSubject(null);

  constructor(
    public sideNavService: SideNavService,
    private profileService: ProfileService,
    private router: Router,
    private notifierService: NotifierService,
    public loader: LoaderService
  ) { }

  get profile(): ProfileData[] {
    return this.profileData.getValue();
  }

  ngOnInit(): void {
    this.sideNavService.navTitle = "Manage Profile";
    this.getData();
  }

  getData() {
    this.profileService.getUserProfile(1).subscribe(
      data => {
        this.profileData.next(data);
        console.log(data);
      },
      err => {
        if (err.status == 401 || err.stats == 403) {
          this.router.navigateByUrl('admin/login');
        } else {
          this.notifierService.showNotification(NotifierMsg.errorMsg, 'OK', 'error');
        }
      });
  }

}
