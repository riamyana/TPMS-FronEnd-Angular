import { Menu, UserMenu, userMenu } from './../../constants/menu-Items';
import { Roles } from './../../constants/roles';
import { Router } from '@angular/router';
import { AuthenticationService } from './../../_services/authentication.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  // isLoggedIn: boolean;
  @Input() user_type: Roles;
  private menu = new UserMenu();
  menuItem: Menu[];
  constructor(
    public authService:AuthenticationService,
    private router:Router
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

}
