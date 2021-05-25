import { Roles } from './../../constants/roles';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent implements OnInit {
  user_type: Roles = Roles.ADMIN;
  constructor() { }

  ngOnInit(): void {
  }

}
