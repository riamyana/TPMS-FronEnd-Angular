import { SideNavService } from './../../_services/side-nav/side-nav.service';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

export interface data {
  name: string;
  email: string;
  status: string;
}
@Component({
  selector: 'app-pass-request',
  templateUrl: './pass-request.component.html',
  styleUrls: ['./pass-request.component.scss']
})

export class PassRequestComponent implements OnInit {
  listData: MatTableDataSource<data>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dispCol: string[] = ['srNo', 'name', 'email', 'status', 'statusAction', 'action'];

  constructor(
    public sideNavService: SideNavService
  ) { }

  ngOnInit(): void {
    this.listData = new MatTableDataSource();
    this.listData.data = [{
      name: 'Riya',
      email: 'riya@gmail.com',
      status: 'Not Approved'
    }];
    console.log(this.listData);

    this.sideNavService.navTitle = "Manage Pass Request";
  }

}
