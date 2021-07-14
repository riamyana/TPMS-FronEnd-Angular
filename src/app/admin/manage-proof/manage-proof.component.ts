import { NotifierMsg } from './../../constants/notifierMsg';
import { AddProofComponent } from './add-proof/add-proof.component';
import { ConfirmDialogComponent } from './../../dialog/confirm-dialog/confirm-dialog.component';
import { ProofService } from './../../_services/proof/proof.service';
import { SideNavService } from './../../_services/side-nav/side-nav.service';
import { NotifierService } from './../../_services/notifier/notifier.service';
import { Router } from '@angular/router';
import { LoaderService } from './../../_services/loader/loader.service';
import { Proof } from './../../_models/Proof/proof';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-manage-proof',
  templateUrl: './manage-proof.component.html',
  styleUrls: ['./manage-proof.component.scss']
})
export class ManageProofComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  listData: MatTableDataSource<Proof>;
  dispCol: string[] = ['srNo', 'proof', 'action'];
  memberType: Proof[];

  constructor(
    private proofService: ProofService,
    public loader: LoaderService,
    private router: Router,
    public dialog: MatDialog,
    private notifierService: NotifierService,
    public sideNavService: SideNavService
  ) {
    this.listData = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.getProof();
    this.sideNavService.navTitle = "Manage Proof";
  }

  getProof() {
    this.proofService.getProof().subscribe(
      data => {
        this.memberType = [];
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

  onDelete(proofData: Proof) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.proofService.deleteProof(proofData.proofId).subscribe(
          data => {
            this.notifierService.showNotification('Proof Deleted Successfully', 'OK', 'success');
            const index = this.listData.data.indexOf(proofData);
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

  onAddProof() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    const dialogRef = this.dialog.open(AddProofComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.listData.data.push(result);
        this.listData._updateChangeSubscription();
        this.listData.paginator = this.paginator;
        this.listData.sort = this.sort;
      }
    });
  }

  onUpdate(proofData: Proof) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = proofData;


    const dialogRef = this.dialog.open(AddProofComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.listData.data
          .filter(value => value.proofId == result.proofId)
          .map( value => value.proofName = result.proofName);
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