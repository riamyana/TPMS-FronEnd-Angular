import { Roles } from './../../constants/roles';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent implements OnInit {

  @Input() user_type: Roles;
  constructor() { }

  ngOnInit(): void {
    // alert(`Default: ${this.user_type}`);
  }

}
