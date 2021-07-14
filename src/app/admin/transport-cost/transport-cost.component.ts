import { AddUpdateTransportCostComponent } from './add-update-transport-cost/add-update-transport-cost.component';
import { ConfirmDialogComponent } from './../../dialog/confirm-dialog/confirm-dialog.component';
import { SideNavService } from './../../_services/side-nav/side-nav.service';
import { LoaderService } from './../../_services/loader/loader.service';
import { NotifierService } from './../../_services/notifier/notifier.service';
import { Router } from '@angular/router';
import { TransportCostDetails } from './../../_models/transport-cost/transport-cost-details';
import { TransportCostService } from './../../_services/transport-cost/transport-cost.service';
import { StationService } from './../../_services/station/station.service';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { NotifierMsg } from 'src/app/constants/notifierMsg';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-transport-cost',
  templateUrl: './transport-cost.component.html',
  styleUrls: ['./transport-cost.component.scss']
})
export class TransportCostComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  listData: MatTableDataSource<TransportCostDetails>;
  dispCol: string[] = ['srNo', 'fromStation', 'toStation', 'cost', 'action'];

  constructor(
    private stationService: StationService,
    public dialog: MatDialog,
    private transportCostService: TransportCostService,
    private router: Router,
    private notifierService: NotifierService,
    public sideNavService: SideNavService,
    public loader: LoaderService
  ) { 
    this.listData = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.getCostDetails();
    this.getStation();
    this.sideNavService.navTitle = "Manage Transport Cost";
  }

  getCostDetails() {
    this.transportCostService.getTransportCost().subscribe(
      data => {
        this.listData.data = data;
        this.listData.paginator = this.paginator;
        this.listData.sort = this.sort;
      },
      err => {
        if (err.status == 401 || err.stats == 403) {
          this.router.navigateByUrl('admin/login');
        } else {
          this.notifierService.showNotification(NotifierMsg.errorMsg, 'OK', 'error');
        }
      });
  }

  onAdd() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    const dialogRef = this.dialog.open(AddUpdateTransportCostComponent, dialogConfig);
  }

  getStation() {
    this.stationService.getStation().subscribe(
      data => {
        this.stationService.station = data;
      },
      err => {
        if (err.status == 401 || err.stats == 403) {
          this.router.navigateByUrl('admin/login');
        } else {
          this.notifierService.showNotification(NotifierMsg.errorMsg, 'OK', 'error');
        }
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.listData.filter = filterValue.trim().toLowerCase();
  }

  onUpdate(data: TransportCostDetails) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = data;

    const dialogRef = this.dialog.open(AddUpdateTransportCostComponent, dialogConfig);
  }

  deleteConfirm(id: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.onDelete(id);
      }
    });
  }

  onDelete(id: number) {
    this.transportCostService.deleteTransportCost(id).subscribe(
      data => {
        this.listData = new MatTableDataSource();
        this.listData.data = data;
        this.listData.paginator = this.paginator;
        this.listData.sort = this.sort;
        this.notifierService.showNotification(NotifierMsg.SuccessDeleteMsg('Transport Cost'), 'OK', 'success');
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
