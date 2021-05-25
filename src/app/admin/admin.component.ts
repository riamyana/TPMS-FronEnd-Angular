import { Roles } from './../constants/roles';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor() { }

  user_type: Roles = Roles.ADMIN;
  ngOnInit(): void {
  }

}
