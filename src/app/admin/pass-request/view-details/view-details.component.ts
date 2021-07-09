import { BehaviorSubject } from 'rxjs';
import { NotifierService } from './../../../_services/notifier/notifier.service';
import { NotifierMsg } from 'src/app/constants/notifierMsg';
import { Router } from '@angular/router';
import { MemberService } from './../../../_services/member/member.service';
import { MemberProfile } from './../../../_models/memberProfile';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-view-details',
  templateUrl: './view-details.component.html',
  styleUrls: ['./view-details.component.scss']
})
export class ViewDetailsComponent implements OnInit {
  memberTypeName: string;

  constructor(
    public dialogRef: MatDialogRef<ViewDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: MemberProfile,
    private memberService: MemberService,
    private router: Router,
    private notifierService: NotifierService
  ) { }

  ngOnInit(): void {
    this.getMemberTypeName(this.data.memberTypeId);
  }

  onOk() {
    this.dialogRef.close();
  }

  getMemberTypeName(memberTypeId: number) {
    this.memberService.getMemberTypeById(memberTypeId).subscribe(
      data => {
        this.memberTypeName = data[0].memberTypeName;
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
