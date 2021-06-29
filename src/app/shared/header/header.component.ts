import { SideNavService } from './../../_services/side-nav/side-nav.service';
import { map, shareReplay } from 'rxjs/operators';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Menu, UserMenu, userMenu, SideNav, NavItem } from './../../constants/menu-Items';
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

  // isLoggedIn: boolean;
  @Input() user_type: Roles;
  private menu = new UserMenu();
  menuItem: Menu[];

  private sideMenu = new SideNav();
  sideMenuItem: Menu[];
  constructor(
    public authService: AuthenticationService,
    private router: Router,
    private breakpointObserver: BreakpointObserver,
    private sideNavService:SideNavService
  ) { }

  ngOnInit(): void {
    this.isLoggedIn();
    this.menuItem = this.menu.userMenu(this.user_type);
    // alert(`header: ${this.user_type}`);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['admin/login']);
    // alert("dkfjdk");
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  changeMenu(menu: string) {
    this.sideNavService.setSideNavMenu(menu);
  }

}
