import { ConfirmDialogComponent } from './../../dialog/confirm-dialog/confirm-dialog.component';
import { NotifierMsg } from './../../constants/notifierMsg';
import { StationService } from '../../_services/station/station.service';
import { Station } from './../../_models/station/station';
import { AddUpdateStationComponent } from './add-update-station/add-update-station.component';
import { MatTableDataSource } from '@angular/material/table';
import { SideNavService } from './../../_services/side-nav/side-nav.service';
import { NotifierService } from './../../_services/notifier/notifier.service';
import { Router } from '@angular/router';
import { LoaderService } from './../../_services/loader/loader.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-station',
  templateUrl: './station.component.html',
  styleUrls: ['./station.component.scss']
})
export class StationComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  listData: MatTableDataSource<Station>;
  dispCol: string[] = ['srNo', 'name', 'swipeId', 'latitude', 'longitude', 'action'];

  constructor(
    public loader: LoaderService,
    private router: Router,
    public dialog: MatDialog,
    private notifierService: NotifierService,
    public sideNavService: SideNavService,
    private stationService: StationService
  ) { 
    this.listData = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.getStations();
    this.sideNavService.navTitle = "Manage Station";
  }

  getStations() {
    this.stationService.getStation().subscribe(
      data => {
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

  onAdd() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    const dialogRef = this.dialog.open(AddUpdateStationComponent, dialogConfig);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.listData.filter = filterValue.trim().toLowerCase();
  }

  onUpdate(data: Station) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = data;

    const dialogRef = this.dialog.open(AddUpdateStationComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.listData.data = this.listData.data.filter((value,key)=>{
          if(value.stationId == result.id){
            value.stationName = result.name;
          }
          return true;
        });

        console.log(this.listData.data);
        this.listData.paginator = this.paginator;
        this.listData.sort = this.sort;
        this.listData._updateChangeSubscription();
      }
    });
  }

  deleteConfirm(data: Station) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.onDelete(data);
      }
    });
  }

  onDelete(data: Station) {
    this.stationService.deleteStation(data.stationId).subscribe(
      data => {
        this.notifierService.showNotification(NotifierMsg.SuccessDeleteMsg('Station'), 'OK', 'success');
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
