import { NotifierService } from './../../_services/notifier/notifier.service';
import { Router } from '@angular/router';
import { MemberType } from './../../_models/member/member-type';
import { MemberService } from './../../_services/member/member.service';
import { ControlContainer, FormGroup, FormGroupDirective } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-member-proof',
  templateUrl: './member-proof.component.html',
  styleUrls: ['./member-proof.component.scss'],
  viewProviders: [ { provide: ControlContainer, useExisting: FormGroupDirective } ]
})
export class MemberProofComponent implements OnInit {
  public proofFormGroup: FormGroup;
  memberTypeData: MemberType[];

  constructor(
    public controlContainer: ControlContainer,
    private memberService: MemberService,
    private router: Router,
    private notifierService: NotifierService
  ) { }

  ngOnInit(): void {
    this.proofFormGroup = this.controlContainer.control.get('proofGroup') as FormGroup;
    this.getMemberType();
  }

  getMemberType() {
    this.memberService.getMemberType().subscribe(
      data => {
        this.memberTypeData = data.filter(value => value.memberTypeName.toLocaleLowerCase() != 'all');
      },
      err => {
        if(err.status == 401 || err.stats == 403) {
          this.router.navigateByUrl('user/login');
        } else {
          this.notifierService.showNotification('Something went wrong..! Please try again.', 'OK', 'error');
        }
      });
  }

}
