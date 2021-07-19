import { StatusCategory } from './../../_models/statusCategoryEnum';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ViewDocumentComponent } from './view-document/view-document.component';
import { MemberService } from './../../_services/member/member.service';
import { ViewDetailsComponent } from './view-details/view-details.component';
import { ConfirmDialogComponent } from './../../dialog/confirm-dialog/confirm-dialog.component';
import { MemberProfile } from './../../_models/memberProfile';
import { NotifierMsg } from './../../constants/notifierMsg';
import { NotifierService } from './../../_services/notifier/notifier.service';
import { LoaderService } from './../../_services/loader/loader.service';
import { Router, ActivatedRoute } from '@angular/router';
import { PassRequestService } from './../../_services/pass-request/pass-request.service';
import { SideNavService } from './../../_services/side-nav/side-nav.service';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import * as moment from 'moment';
@Component({
  selector: 'app-pass-request',
  templateUrl: './pass-request.component.html',
  styleUrls: ['./pass-request.component.scss']
})

export class PassRequestComponent implements OnInit {
  listData: MatTableDataSource<MemberProfile>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dispCol: string[] = ['srNo', 'firstName', 'lastName', 'statusDescription', 'description', 'statusAction', 'action'];
  memberTypeName: string;
  descriptionForm: FormGroup;
  passForm: FormGroup;
  disapproved: boolean = false;
  approved: boolean = false;
  memberProfileData: MemberProfile;

  minDate = moment().toDate();
  paramStatus: string;

  constructor(
    private fb: FormBuilder,
    public sideNavService: SideNavService,
    private passRequestService: PassRequestService,
    private router: Router,
    private notifierService: NotifierService,
    public dialog: MatDialog,
    public loader: LoaderService,
    private memberService: MemberService,
    private route: ActivatedRoute
  ) {
    this.listData = new MatTableDataSource();
  }

  ngOnInit(): void {

    this.sideNavService.navTitle = "Manage Pass Request";

    this.getPassRequest();

    this.initForm();
  }

  initForm() {
    this.descriptionForm = this.fb.group({
      description: ['', Validators.required]
    });

    this.passForm = this.fb.group({
      serialNo: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]],
      expiry: ['', [Validators.required, Validators.maxLength(6)]]
    });
  }

  get form() {
    return this.passForm.controls;
  }

  getPassRequest() {
    this.passRequestService.getMemberPassRequest().subscribe(
      data => {
        let tempData;
        this.listData.data = data;
        tempData = this.listData.data;
        this.listData.data.forEach(value => {
          if (value.status == StatusCategory.DEFAULT) {
            value.statusDescription = "New Request";
          } else if (value.status == StatusCategory.DISAPPROVED) {
            value.statusDescription = "Not Approved";
          } else if (value.status == StatusCategory.UPDATED) {
            value.statusDescription = "Request Updated";
          }
        });

        this.route.params.subscribe(
          params => {
            this.paramStatus = params['status'];
            if (this.paramStatus) {
              this.listData.data = this.listData.data.filter(value => value.status == +this.paramStatus);
            } else {
              this.listData.data = tempData;
            }
          }
        );
      },
      err => {
        if (err.status == 401 || err.stats == 403) {
          this.router.navigateByUrl('admin/login');
        } else if (err.status == 404) {
          // this.notifierService.showNotification(NotifierMsg.noPassReq, 'OK', 'error');
        } else {
          this.notifierService.showNotification(NotifierMsg.errorMsg, 'OK', 'error');
        }
      });
  }

  onApprove(data: MemberProfile) {
    this.memberProfileData = data;
    this.approved = true;
    this.disapproved = false;
  }

  onApproveConfirmed() {
    this.approved = false;
    this.memberProfileData.status = StatusCategory.APPROVED;
    this.memberProfileData.description = null;

    this.passRequestService.changePassRequestStatus(this.memberProfileData).subscribe(
      data => {
        // this.getPassRequest();
        this.notifierService.showNotification(NotifierMsg.passRequest('approve'), 'OK', 'success');
      },
      err => {
        if (err.status == 401 || err.stats == 403) {
          this.router.navigateByUrl('admin/login');
        } else {
          this.notifierService.showNotification(NotifierMsg.errorMsg, 'OK', 'error');
        }
      });

    this.passRequestService.addPass(this.memberProfileData, this.passForm).subscribe(
      data => {
        // this.getPassRequest();
        // this.notifierService.showNotification(NotifierMsg.passMsg('success'), 'OK', 'success');
        const index = this.listData.data.indexOf(this.memberProfileData);
        this.listData.data.splice(index, 1);
        this.listData._updateChangeSubscription();
      },
      err => {
        if (err.status == 401 || err.stats == 403) {
          this.router.navigateByUrl('admin/login');
        } else {
          this.notifierService.showNotification(NotifierMsg.passMsg('error'), 'OK', 'error');
        }
      });
  }

  onDisapprove(data: MemberProfile) {
    this.disapproved = true;
    this.approved = false;
    this.memberProfileData = data;
  }

  onDisapproveConfirmed() {
    this.disapproved = false;

    this.memberProfileData.description = this.descriptionForm.get('description').value;
    this.memberProfileData.status = StatusCategory.DISAPPROVED;

    this.passRequestService.changePassRequestStatus(this.memberProfileData).subscribe(
      data => {
        // this.getPassRequest();
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

    data.memberTypeName = this.memberTypeName;
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

  onViewDocument(data: MemberProfile) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.height = "100vh";
    dialogConfig.data = data;

    const dialogRef = this.dialog.open(ViewDocumentComponent, dialogConfig);
  }

  onCancel() {
    this.disapproved = false;
  }

  onCancelApprove() {
    this.approved = false;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.listData.filter = filterValue.trim().toLowerCase();
  }

}
