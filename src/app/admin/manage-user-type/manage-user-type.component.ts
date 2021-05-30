import { SideNavService } from './../../_services/side-nav/side-nav.service';
import { NotifierService } from './../../_services/notifier/notifier.service';
import { AddMemberComponent } from './add-member/add-member.component';
import { ConfirmDialogComponent } from './../../dialog/confirm-dialog/confirm-dialog.component';
import { Router } from '@angular/router';
import { LoaderService } from './../../_services/loader/loader.service';
import { MemberType } from './../../_models/member/member-type';
import { MemberService } from './../../_services/member/member.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-manage-user-type',
  templateUrl: './manage-user-type.component.html',
  styleUrls: ['./manage-user-type.component.scss']
})
export class ManageUserTypeComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  listData: MatTableDataSource<MemberType>;
  dispCol: string[] = ['id', 'memberType', 'action'];
  memberType: MemberType[];

  demo = [
    { 'full': 'abc', 'age': '25' },
    { 'full': 'xyz', 'age': '30' },
    { 'full': 'def', 'age': '67' }
  ];

  constructor(
    private memberService: MemberService,
    public loader: LoaderService,
    private router: Router,
    public dialog: MatDialog,
    private notifierService: NotifierService,
    public sideNavService:SideNavService
  ) { }

  ngOnInit(): void {
    // this.listData = new MatTableDataSource(this.demo);
    this.getEmployees();
    this.sideNavService.navTitle = "Manage Member Type";
  }

  getEmployees() {
    this.memberService.getMemberType().subscribe(
      data => {
        this.memberType = [];
        this.listData = new MatTableDataSource();
        this.listData.data = data;
        this.listData.paginator = this.paginator;
        this.listData.sort = this.sort;
        console.log(data);
      },
      err => {
        if(err.status == 401 || err.stats == 403) {
          this.router.navigateByUrl('admin/login');
        } else {
          this.notifierService.showNotification('Something went wrong..! Please try again.', 'OK', 'error');
        }
      });
  }

  onDelete() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  onAddMember() {
    const dialogRef = this.dialog.open(AddMemberComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
