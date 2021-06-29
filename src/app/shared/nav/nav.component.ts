import { AuthenticationService } from './../../_services/authentication.service';
import { SideNavService } from './../../_services/side-nav/side-nav.service';
import { SideNav, sideNavMenu2 } from './../../constants/menu-Items';
import { Component, HostListener, Input } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {

  menu2 = sideNavMenu2;
  private menu = new SideNav();
  menuTitle: string = "Admin Panel";
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

  ngOnInit(): void { }

  setMenuTitle(label: string) {
    this.sideNavService.navTitle = label;
  }

  // @HostListener('click') myClick() {
  //   alert('clicked');
  // }
}
