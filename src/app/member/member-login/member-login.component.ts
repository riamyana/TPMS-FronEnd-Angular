import { Roles } from './../../constants/roles';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-member-login',
  templateUrl: './member-login.component.html',
  styleUrls: ['./member-login.component.scss']
})
export class MemberLoginComponent implements OnInit {
  user_type: Roles = Roles.USER;
  constructor() { }

  ngOnInit(): void {
  }

}
