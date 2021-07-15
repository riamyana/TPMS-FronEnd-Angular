import { EditTransportModeComponent } from './edit-transport-mode/edit-transport-mode.component';
import { ConfirmDialogComponent } from './../../dialog/confirm-dialog/confirm-dialog.component';
import { AddTransportModeComponent } from './add-transport-mode/add-transport-mode.component';
import { TransportModeService } from './../../_services/transport-mode/transport-mode.service';
import { LoaderService } from './../../_services/loader/loader.service';
import { Router } from '@angular/router';
import { NotifierService } from './../../_services/notifier/notifier.service';
import { SideNavService } from './../../_services/side-nav/side-nav.service';
import { MatTableDataSource } from '@angular/material/table';
import { TransportMode } from './../../_models/transport-mode/transport-mode';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-transport-mode',
  templateUrl: './transport-mode.component.html',
  styleUrls: ['./transport-mode.component.scss']
})
export class TransportModeComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  listData: MatTableDataSource<TransportMode>;
  dispCol: string[] = ['srNo', 'name', 'action'];

  constructor(
    public loader: LoaderService,
    private router: Router,
    public dialog: MatDialog,
    private notifierService: NotifierService,
    public sideNavService: SideNavService,
    private transportModeService: TransportModeService
  ) { 
    this.listData = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.getTranportModes();
    this.sideNavService.navTitle = "Manage Transport Mode";
  }

  getTranportModes() {
    this.transportModeService.getTransportModes().subscribe(
      data => {
        this.listData.data = data;
        this.listData.paginator = this.paginator;
        this.listData.sort = this.sort;
      },
      err => {
        if (err.status == 401 || err.stats == 403) {
          this.router.navigateByUrl('admin/login');
        } else {
          this.notifierService.showNotification('Something went wrong..! Please try again.', 'OK', 'error');
          console.log(err);
        }
      });
  }

  onDelete(modeType: TransportMode) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.transportModeService.deleteMode(modeType.id).subscribe(
          data => {
            this.notifierService.showNotification('Transport Mode Type Deleted Successfully', 'OK', 'success');
            const index = this.listData.data.indexOf(modeType);
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

    const dialogRef = this.dialog.open(AddTransportModeComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.listData.data.push(result);
        this.listData._updateChangeSubscription();
        this.listData.paginator = this.paginator;
        this.listData.sort = this.sort;
      }
    });
  }

  onUpdate(modeTypeData: TransportMode) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = modeTypeData


    const dialogRef = this.dialog.open(EditTransportModeComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
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
