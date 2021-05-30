import { EditProofComponent } from './edit-proof/edit-proof.component';
import { filter, map } from 'rxjs/operators';
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
  dispCol: string[] = ['srNo', 'memberTypeName', 'proofName', 'action'];
  uniqueMemberType: string[];

  constructor(
    public loader: LoaderService,
    private router: Router,
    public dialog: MatDialog,
    private notifierService: NotifierService,
    public sideNavService: SideNavService,
    private proofService: ProofService
  ) { }

  ngOnInit(): void {
    this.getProof();
    this.sideNavService.navTitle = "Manage Member Type";
  }

  getProof() {
    this.proofService.getProof().subscribe(
      data => {

        this.uniqueMemberType = data
          .map(item => item.memberTypeName)
          .filter((value, index, self) => {
            if (self.indexOf(value) === index) {
              
            }
          });
          
        // console.log(unique.filter(value => {
        //   data.filter(member => member == value)
        // }));
          
        
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
          this.notifierService.showNotification('Something went wrong..! Please try again.', 'OK', 'error');
        }
      });
  }

  deleteConfirm(data: Proof) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.onDelete(data);
        console.log(data.memberTypeId);
        // console.log(`Dialog result: ${result}`);
      }
    });
  }

  onDelete(data: Proof) {
    // this.proofService.deleteMemberType(data.memberTypeId).subscribe(
    //   result => {
    //     this.notifierService.showNotification('Data Deleted Successfully..!', 'OK', 'success');
    //     var index = this.listData.data.indexOf(data, 0);
    //     this.listData.data.splice(index, 1);
    //     this.listData.paginator = this.paginator;
    //     this.listData.sort = this.sort;

    //     console.log("index"+index);
    //   },
    //   err => {
    //     this.notifierService.showNotification('Something went wrong..! Please try again.', 'OK', 'error');
    //     console.log(err);
    //   });
  }

  onAdd() {
    const dialogRef = this.dialog.open(AddProofComponent);

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log("dkfjd"+result);
    //   if (result) {
    //     // this.getMemberType();
    //     this.listData.data.push(result);
    //     this.listData.paginator = this.paginator;
    //     this.listData.sort = this.sort;
    //     console.log("dkfjdmitesh");
    //     console.log(this.listData);
    //     console.log(result);
    //   }
    // });
  }

  onUpdate(memberTypeData: Proof) {
    const dialogConfig = new MatDialogConfig();

    // dialogConfig.disableClose = true;
    // dialogConfig.autoFocus = true;

    dialogConfig.data = memberTypeData


    const dialogRef = this.dialog.open(EditProofComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.listData.data = this.listData.data.filter((value)=>{
          if(value.memberTypeId == result.memberTypeId){
            value.memberTypeName = result.memberTypeName;
          }
          return true;
        });

        this.listData.paginator = this.paginator;
        this.listData.sort = this.sort;
      }
    });


  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.listData.filter = filterValue.trim().toLowerCase();
  }

  getMemberTypeProof(name: string) {
    
  }

  getUniqueMember() {

    console.log(this.uniqueMemberType);
    return this.uniqueMemberType;
  }
}