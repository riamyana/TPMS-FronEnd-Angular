import { UserModel } from './../../_models/userModel';
import { AuthenticationService } from './../../_services/authentication.service';
import { SideNavService } from './../../_services/side-nav/side-nav.service';
import { SideNav, sideNavMenu2 } from './../../constants/menu-Items';
import { Component, HostListener, Input, OnInit, OnDestroy } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit, OnDestroy {

  menu2 = sideNavMenu2;
  private menu = new SideNav();
  menuTitle: string = "Admin Panel";
  currentUser: UserModel;
  imageUrl: String = "../assets/undraw_profile_pic_ic5t.svg";
  subscriptions: Subscription[];
  // menuItem: Menu[];

  // @Input() sideNav: Menu[];

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    public sideNavService: SideNavService,
    public authService: AuthenticationService
  ) {

  }

  ngOnInit(): void { 
    this.currentUser = this.authService.currentUserValue;
    if (this.currentUser.profileImage)
      this.imageUrl = `http://localhost:8080/image/${this.currentUser.profileImage}`;

    this.applySubscription();
  }

  applySubscription() {
    this.authService.currentUserSubject.subscribe(data => {
      if (data.profileImage)
        this.imageUrl = `http://localhost:8080/image/${data.profileImage}`;
    });
  }

  setMenuTitle(label: string) {
    this.sideNavService.navTitle = label;
  }

  ngOnDestroy(): void {
    if (this.subscriptions && this.subscriptions.length > 0) {
      this.subscriptions.forEach(s => s.unsubscribe());
    }
  }
}
