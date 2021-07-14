import { NotifierMsg } from './../../constants/notifierMsg';
import { MemberType } from './../../_models/member/member-type';
import { MemberService } from './../../_services/member/member.service';
import { SaveProofRequirementComponent } from './save-proof-requirement/save-proof-requirement.component';
import { ProofRequirement } from './../../_models/proofRequirement';
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

interface DialogData {
  dialogType: string;
  member?: MemberType[];
  proof?: Proof[];
  id?: number;
  memberTypeId?: number;
  proofId?: number;
}

@Component({
  selector: 'app-manage-proof-requirement',
  templateUrl: './manage-proof-requirement.component.html',
  styleUrls: ['./manage-proof-requirement.component.scss']
})
export class ManageProofRequirementComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  listData: MatTableDataSource<ProofRequirement>;
  dispCol: string[] = ['srNo', 'memberTypeName', 'proofName', 'action'];
  data: DialogData = {
    dialogType: "Add"
  };;
  uniqueMemberType: string[];

  constructor(
    public loader: LoaderService,
    private router: Router,
    public dialog: MatDialog,
    private notifierService: NotifierService,
    public sideNavService: SideNavService,
    private proofService: ProofService,
    private memberService: MemberService
  ) {
    this.listData = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.getProofRequirement();
    this.getProof();
    this.getMemberType();
    this.sideNavService.navTitle = "Manage Member Proof Requirement";
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

  getProof() {
    this.proofService.getProof().subscribe(
      data => {
        this.data.proof = data;
      },
      err => {
        if (err.status == 401 || err.stats == 403) {
          this.router.navigateByUrl('admin/login');
        } else if (err.status == 404) {
          this.notifierService.showNotification('No Data Available', 'OK', 'error');
        } else {
          this.notifierService.showNotification('Something went wrong..! Please try again.', 'OK', 'error');
          console.log(err);
        }
      });
  }

  getProofRequirement() {

    this.proofService.getProofRequirement().subscribe(
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

  deleteConfirm(data: ProofRequirement) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.onDelete(data);
      }
    });
  }

  onDelete(data: ProofRequirement) {
    this.proofService.deleteProofRequirement(data.id).subscribe(
      result => {
        this.notifierService.showNotification(NotifierMsg.SuccessDeleteMsg('Proof Requirement'), 'OK', 'success');
        var index = this.listData.data.indexOf(data, 0);
        this.listData.data.splice(index, 1);
        this.listData.paginator = this.paginator;
        this.listData.sort = this.sort;
        this.getProof();
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
    this.data.dialogType = "Add";
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = this.data;

    const dialogRef = this.dialog.open(SaveProofRequirementComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.listData.data.push(result);
        this.listData._updateChangeSubscription();
        this.listData.paginator = this.paginator;
        this.listData.sort = this.sort;
        this.getProof();
      }
    });
  }

  onUpdate(proofReqData: ProofRequirement) {
    this.data.dialogType = "Update";
    this.data.id = proofReqData.id;
    this.data.memberTypeId = proofReqData.memberTypeId;
    this.data.proofId = proofReqData.proofId;

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = this.data;

    const dialogRef = this.dialog.open(SaveProofRequirementComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.listData.data
          .filter(value => value.id == result.id)
          .map( value => value.proofName = result.proofName);
        this.listData._updateChangeSubscription();
        this.listData.paginator = this.paginator;
        this.listData.sort = this.sort;

        this.getProof();
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
    // return this.uniqueMemberType;
  }
}
