import { SideNavService } from './../../_services/side-nav/side-nav.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manage-package',
  templateUrl: './manage-package.component.html',
  styleUrls: ['./manage-package.component.scss']
})
export class ManagePackageComponent implements OnInit {

  constructor(
    public sideNavService:SideNavService
  ) {
    this.sideNavService.navTitle = "Manage Package";
  }

  ngOnInit(): void {
  }

}
