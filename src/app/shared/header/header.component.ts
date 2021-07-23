import { SideNavService } from './../../_services/side-nav/side-nav.service';
import { map, shareReplay } from 'rxjs/operators';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Menu, UserMenu, SideNav, NavItem, userMenu } from './../../constants/menu-Items';
import { Roles } from './../../constants/roles';
import { Router } from '@angular/router';
import { AuthenticationService } from './../../_services/authentication.service';
import { Component, Input, OnInit, VERSION, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @ViewChild('childMenu') public childMenu;
  version = VERSION;
  
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  @Input() user_type: Roles;
  user_role: Roles;
  role = Roles;
  // private menu = new UserMenu();
  menuItem: Menu[];
  headerMenu = userMenu;

  private sideMenu = new SideNav();
  sideMenuItem: Menu[];
  constructor(
    public authService: AuthenticationService,
    public router: Router,
    private breakpointObserver: BreakpointObserver,
    private sideNavService:SideNavService
  ) { }

  ngOnInit(): void {
    if (!this.isLoggedIn) {
      if (this.router.url.includes('/admin')) {
        this.user_role = Roles.ADMIN;
      } else if (this.router.url.includes('/user')) {
        this.user_role = Roles.USER;
      }
    } else {
      this.user_role = this.authService.currentUserValue.role;
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate([`${this.user_role.toLowerCase()}/login`]);
  }

  myProfile() {
    this.router.navigate([`${this.user_role.toLowerCase()}/my-profile`]);
  }

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  changeMenu(menu: string) {
    this.sideNavService.setSideNavMenu(menu);
  }

}
