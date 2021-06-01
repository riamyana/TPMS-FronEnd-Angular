import { DialogData } from './../../_models/dialogData/dialogData';
import { MemberType } from './../../_models/member/member-type';
import { MemberService } from './../../_services/member/member.service';
import { AddPackageComponent } from './add-package/add-package.component';
import { ConfirmDialogComponent } from './../../dialog/confirm-dialog/confirm-dialog.component';
import { Package } from './../../_models/package/package';
import { PackageService } from './../../_services/package/package.service';
import { NotifierService } from './../../_services/notifier/notifier.service';
import { Router } from '@angular/router';
import { LoaderService } from './../../_services/loader/loader.service';
import { MatTableDataSource } from '@angular/material/table';
import { SideNavService } from './../../_services/side-nav/side-nav.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-manage-package',
  templateUrl: './manage-package.component.html',
  styleUrls: ['./manage-package.component.scss']
})
export class ManagePackageComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  listData: MatTableDataSource<Package>;
  dispCol: string[] = ['srNo', 'name', 'memberType', 'subscriptionType', 'validity', 'balance', 'price', 'action'];
  packageData: Package[];
  memberTypeData: MemberType[];
  data: DialogData = {};

  constructor(
    public sideNavService: SideNavService,
    public loader: LoaderService,
    private router: Router,
    public dialog: MatDialog,
    private notifierService: NotifierService,
    private packageService: PackageService,
    private memberService: MemberService
  ) {
    this.sideNavService.navTitle = "Manage Package";
  }

  ngOnInit(): void {
    this.getPackages();
    this.getMemberType();
    // this.getSubscriptionType();
  }

  getMemberType() {
    this.memberService.getMemberType().subscribe(
      data => {
        this.data.member = data;
      },
      err => {
        if (err.status == 401 || err.stats == 403) {
          this.router.navigateByUrl('admin/login');
        } else {
          this.notifierService.showNotification('Something went wrong..! Please try again.', 'OK', 'error');
        }
      });
  }

  // getSubscriptionType() {
  //   this.packageService.getSubscriptionType().subscribe(
  //     data => {
  //       this.data.subscriptionType = data;
  //     },
  //     err => {
  //       if (err.status == 401 || err.stats == 403) {
  //         this.router.navigateByUrl('admin/login');
  //       } else {
  //         this.notifierService.showNotification('Something went wrong..! Please try again.', 'OK', 'error');
  //       }
  //     });
  // }

  getPackages() {
    this.packageService.getPackages().subscribe(
      data => {
        this.listData = new MatTableDataSource();
        this.listData.data = data;
        this.listData.paginator = this.paginator;
        this.listData.sort = this.sort;
        console.log(data);
      },
      err => {
        if (err.status == 401 || err.stats == 403) {
          this.router.navigateByUrl('admin/login');
        } else if(err.status == 404){
          this.notifierService.showNotification('No Data Available', 'OK', 'error');
        } else {
          this.notifierService.showNotification('Something went wrong..! Please try again.', 'OK', 'error');
          console.log(err);
        }
      });
  }

  onDelete(pck: Package) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.packageService.deletePackage(pck.id).subscribe(
          data => {
            this.notifierService.showNotification('Package Deleted Successfully', 'OK', 'success');
            const index = this.listData.data.indexOf(pck);
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
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = this.data;

    const dialogRef = this.dialog.open(AddPackageComponent, dialogConfig);

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log(`Dialog result: ${result}`);
    //   this.listData.data.push(result);
    //   this.listData._updateChangeSubscription();
    //   this.listData.paginator = this.paginator;
    //   this.listData.sort = this.sort;
    // });
  }

  onUpdate(pck: Package) {
    // const dialogConfig = new MatDialogConfig();

    // dialogConfig.disableClose = true;
    // dialogConfig.autoFocus = true;

    // dialogConfig.data = memberTypeData


    // const dialogRef = this.dialog.open(EditMemberTypeComponent, dialogConfig);
    // dialogRef.afterClosed().subscribe(result => {
    //   console.log(result);
    //   if (result) {
    //     console.log("in" + result);
    //     this.listData._updateChangeSubscription();
    //     this.listData.paginator = this.paginator;
    //     this.listData.sort = this.sort;
    //   }
    // });
  }

}
