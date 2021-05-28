import { Menu, SideNav } from './../../constants/menu-Items';
import { Injectable } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
// import 'rxjs/add/operator/filter';
// import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class SideNavService {
  sideMenuItem: Menu[] = [
    { label: 'Manage Member Type', routerLink: '' },
    { label: 'Manage Proof', routerLink: '' },
    { label: 'Manage Member Wise Proof', routerLink: '' }
  ];
  private sideMenu = new SideNav();
  sideNavTitle: string;
  title: string;

  private sideMenuSubject: BehaviorSubject<Menu[]>;
  public currentSideMenu: Observable<Menu[]>;

  // activeMenuItem$: Observable<Menu[]>;

  constructor(private activatedRoute: ActivatedRoute, private router: Router) {
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        map(() => this.activatedRoute.snapshot),
        map(route => {
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route;
        })
      )
      .subscribe((route: ActivatedRouteSnapshot) => {
        console.log(route.data);
        this.sideNavTitle = route.data.menuTitle;
        // console.log("title"+this.title);
        this.sideMenuItem = this.sideMenu.sideNav(this.sideNavTitle);
        // console.log("side");
        // console.log(this.sideMenuItem);
        this.sideMenuSubject = new BehaviorSubject<Menu[]>(this.sideMenuItem);
        this.currentSideMenu = this.sideMenuSubject.asObservable();
      });

    // console.log("title" + this.sideNavTitle);

  }

  public get sideNavTitleValue(): string {
    return this.sideNavTitle;
  }

  setSideNavMenu(menu: any) {
    this.sideMenuItem = this.sideMenu.sideNav(menu);
    this.sideMenuSubject.next(this.sideMenuItem);
  }

  getSideNavMenu(): Menu[] {
    return this.sideMenuItem;
  }

  // getMenuItems(): Menu[] {
  //   const title = this.activatedRoute.url.subscribe(() => {
  //     const data = this.activatedRoute.snapshot.firstChild.data;
  //     if (data && data.menuTitle) {
  //       this.title = this.activatedRoute.snapshot.firstChild.data.menuTitle;
  //     }
  //   });

  //   this.sideMenuItem = this.sideMenu.sideNav(this.title);
  //   this.sideMenuSubject.next(this.sideMenuItem);
  //   return this.sideMenuItem;
  // }

  public get currentSideMenuValue(): Menu[] {
    return this.sideMenuSubject.value;
  }

  public set navTitle(title: string) {
    this.title = title;
  }

  public get navTitle(): string {
    return this.title;
  }
}
