import { MemberService } from './../../_services/member/member.service';
import { ViewDetailsComponent } from './view-details/view-details.component';
import { ConfirmDialogComponent } from './../../dialog/confirm-dialog/confirm-dialog.component';
import { MemberProfile } from './../../_models/memberProfile';
import { NotifierMsg } from './../../constants/notifierMsg';
import { NotifierService } from './../../_services/notifier/notifier.service';
import { LoaderService } from './../../_services/loader/loader.service';
import { Router } from '@angular/router';
import { PassRequestService } from './../../_services/pass-request/pass-request.service';
import { SideNavService } from './../../_services/side-nav/side-nav.service';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
@Component({
  selector: 'app-pass-request',
  templateUrl: './pass-request.component.html',
  styleUrls: ['./pass-request.component.scss']
})

export class PassRequestComponent implements OnInit {
  listData: MatTableDataSource<MemberProfile>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dispCol: string[] = ['srNo', 'firstName', 'lastName', 'status', 'statusAction', 'action'];
  memberTypeName: string;

  constructor(
    public sideNavService: SideNavService,
    private passRequestService: PassRequestService,
    private router: Router,
    private notifierService: NotifierService,
    public dialog: MatDialog,
    public loader: LoaderService,
    private memberService: MemberService
  ) { }

  ngOnInit(): void {
    console.log(this.listData);

    this.sideNavService.navTitle = "Manage Pass Request";

    this.getPassRequest();
  }

  getPassRequest() {
    this.passRequestService.getMemberPassRequest().subscribe(
      data => {
        this.listData = new MatTableDataSource();
        this.listData.data = data;

        console.log(data);
        this.notifierService.showNotification(NotifierMsg.errorMsg, 'OK', 'success');
      },
      err => {
        if (err.status == 401 || err.stats == 403) {
          this.router.navigateByUrl('admin/login');
        } else {
          this.notifierService.showNotification(NotifierMsg.errorMsg, 'OK', 'error');
        }
      });
  }

  onApprove(data: MemberProfile) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = "Do you want to Approve?";

    const dialogRef = this.dialog.open(ConfirmDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.onApproveConfirmed(data.memberId);
      }
    });
  }

  onApproveConfirmed(memberId: number) {
    this.passRequestService.changePassRequestStatus(memberId, true).subscribe(
      data => {
        console.log(data);
        this.notifierService.showNotification(NotifierMsg.passRequest('approve'), 'OK', 'success');
      },
      err => {
        if (err.status == 401 || err.stats == 403) {
          this.router.navigateByUrl('admin/login');
        } else {
          this.notifierService.showNotification(NotifierMsg.errorMsg, 'OK', 'error');
        }
      });
  }

  onDisapprove(data: MemberProfile) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = "Do you want to Disapprove?";

    const dialogRef = this.dialog.open(ConfirmDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.onDisapproveConfirmed(data.memberId);
      }
    });
  }

  onDisapproveConfirmed(memberId: number) {
    this.passRequestService.changePassRequestStatus(memberId, false).subscribe(
      data => {
        console.log(data);
        this.notifierService.showNotification(NotifierMsg.passRequest('disapprove'), 'OK', 'success');
      },
      err => {
        if (err.status == 401 || err.stats == 403) {
          this.router.navigateByUrl('admin/login');
        } else {
          this.notifierService.showNotification(NotifierMsg.errorMsg, 'OK', 'error');
        }
      });
  }

  onViewDetails(data: MemberProfile) {
    // this.getMemberTypeName(data.memberTypeId);

    data.memberTypeName = this.memberTypeName;

    console.log(data.memberTypeName);

    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.data = data;

    const dialogRef = this.dialog.open(ViewDetailsComponent, dialogConfig);

  }

  getMemberTypeName(memberTypeId: number) {
    this.memberService.getMemberTypeById(memberTypeId).subscribe(
      data => {
        this.memberTypeName = data.memberTypeName;
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

}
