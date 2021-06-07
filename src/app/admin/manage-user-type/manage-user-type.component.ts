import { NotifierMsg } from './../../constants/notifierMsg';
import { EditMemberTypeComponent } from './edit-member-type/edit-member-type.component';
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
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-manage-user-type',
  templateUrl: './manage-user-type.component.html',
  styleUrls: ['./manage-user-type.component.scss']
})
export class ManageUserTypeComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  listData: MatTableDataSource<MemberType>;
  dispCol: string[] = ['srNo', 'memberType', 'action'];
  memberType: MemberType[];

  constructor(
    private memberService: MemberService,
    public loader: LoaderService,
    private router: Router,
    public dialog: MatDialog,
    private notifierService: NotifierService,
    public sideNavService: SideNavService
  ) { }

  ngOnInit(): void {
    // this.listData = new MatTableDataSource(this.demo);
    this.getMemberTypes();
    this.sideNavService.navTitle = "Manage Member Type";
  }

  getMemberTypes() {
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
        if (err.status == 401 || err.stats == 403) {
          this.router.navigateByUrl('admin/login');
        } else {
          this.notifierService.showNotification(NotifierMsg.errorMsg, 'OK', 'error');
        }
      });
  }

  onDelete(memberType: MemberType) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.memberService.deleteMemberType(memberType.memberTypeId).subscribe(
          data => {
            this.notifierService.showNotification('Member Type Deleted Successfully', 'OK', 'success');
            const index = this.listData.data.indexOf(memberType);
            this.listData.data.splice(index, 1);
            this.listData._updateChangeSubscription();
          }, err => {
            if (err.status == 401 || err.stats == 403) {
              this.router.navigateByUrl('admin/login');
            } else {
              this.notifierService.showNotification('Something went wrong..! Please try again.', 'OK', 'error');
            }
          }
        )
      }
    });
  }

  onAddMember() {
    const dialogRef = this.dialog.open(AddMemberComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.listData.data.push(result);
      this.listData._updateChangeSubscription();
      this.listData.paginator = this.paginator;
      this.listData.sort = this.sort;
    });
  }

  onUpdate(memberTypeData: MemberType) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = memberTypeData


    const dialogRef = this.dialog.open(EditMemberTypeComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {
        console.log("in" + result);
        this.listData._updateChangeSubscription();
        this.listData.paginator = this.paginator;
        this.listData.sort = this.sort;
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.listData.filter = filterValue.trim().toLowerCase();
  }

}
