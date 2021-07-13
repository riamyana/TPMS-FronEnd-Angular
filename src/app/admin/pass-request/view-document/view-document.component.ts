import { MemberProfile } from './../../../_models/memberProfile';
import { MemberProof } from './../../../_models/memberProof';
import { PassRequestService } from './../../../_services/pass-request/pass-request.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-view-document',
  templateUrl: './view-document.component.html',
  styleUrls: ['./view-document.component.scss']
})
export class ViewDocumentComponent implements OnInit {
  proofData: MemberProof[] = [];

  constructor(
    private passRequestService: PassRequestService,
    @Inject(MAT_DIALOG_DATA) public data: MemberProfile,
  ) { }

  ngOnInit(): void {
    this.getMemberProof();
  }

  getMemberProof() {
    this.passRequestService.getProofs(this.data.memberId).subscribe(
      data => {
        this.proofData = data;
        this.proofData[0].proofImage;
        console.log(data);
      },
      err => {
        console.log(err);
      }
    );
  }

}
