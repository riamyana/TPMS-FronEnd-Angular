import { LoaderService } from './../../_services/loader/loader.service';
import { NotifierMsg } from './../../constants/notifierMsg';
import { Proof } from './../../_models/Proof/proof';
import { distinctUntilChanged, filter } from 'rxjs/operators';
import { ProofService } from './../../_services/proof/proof.service';
import { NotifierService } from './../../_services/notifier/notifier.service';
import { Router } from '@angular/router';
import { MemberType } from './../../_models/member/member-type';
import { MemberService } from './../../_services/member/member.service';
import { ControlContainer, FormGroup, FormGroupDirective, FormArray, FormBuilder, Validators } from '@angular/forms';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-member-proof',
  templateUrl: './member-proof.component.html',
  styleUrls: ['./member-proof.component.scss'],
  viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }]
})
export class MemberProofComponent implements OnInit, OnDestroy {
  public proofForm: FormGroup;
  memberTypeData: MemberType[];
  private subscriptions: Subscription[] = [];
  public proofData: Proof[];
  public fileName = '';
  public url;

  constructor(
    public controlContainer: ControlContainer,
    private memberService: MemberService,
    private router: Router,
    private notifierService: NotifierService,
    private proofService: ProofService,
    private fb: FormBuilder,
    public loader: LoaderService
  ) { }

  ngOnInit(): void {
    this.proofForm = this.controlContainer.control.get('proofGroup') as FormGroup;
    this.getMemberType();
    this.applySubscription();
  }

  get form() {
    return this.proofForm.controls;
  }

  get proofs() {
    return this.proofForm.get('proofs') as FormArray;
  }

  getMemberType() {
    this.memberService.getMemberType().subscribe(
      data => {
        this.memberTypeData = data.filter(value => value.memberTypeName.toLocaleLowerCase() != 'all');
      },
      err => {
        if (err.status == 401 || err.stats == 403) {
          this.router.navigateByUrl('user/login');
        } else {
          this.notifierService.showNotification('Something went wrong..! Please try again.', 'OK', 'error');
        }
      });
  }

  applySubscription() {
    this.subscriptions.push(
      this.form.requestAs.valueChanges.pipe(distinctUntilChanged()).subscribe((value) => {
        this.getMemberTypeProof(value);
      })
    );
  }

  getMemberTypeProof(value: number) {
    this.proofService.getProofByMemberId(value).subscribe(
      data => {
        this.proofData = data;
        this.proofs.clear();
        for (let i = 0; i < data.length; i++) {
          const newProof = this.fb.group({
            proofId: [data[i].proofId, Validators.required],
            proofNo: ['', Validators.required],
            proofName: ['', Validators.required]
          });
          this.proofs.push(newProof);
        }

        console.log(this.proofs);
      },
      err => {
        if (err.status == 401 || err.stats == 403) {
          this.router.navigateByUrl('user/login');
        } else if (err.status == 404) {
          const typeName: MemberType = this.memberTypeData.find(value => value.memberTypeId == this.form.requestAs.value);
          this.notifierService.showNotification(NotifierMsg.memberProofNotFound(typeName.memberTypeName), 'OK', 'error');
        }
        else {
          this.notifierService.showNotification(NotifierMsg.errorMsg, 'OK', 'error');
        }
      });
  }

  ngOnDestroy() {
    if (this.subscriptions && this.subscriptions.length > 0) {
      this.subscriptions.forEach(s => s.unsubscribe());
    }
  }

  onSelectFile(event, i) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      console.log(event.target.files[0].name);
      
      this.proofs.controls.forEach(control => {
        console.log(control.get('proofName').value);
      });

      this.fileName = event.target.files[0].name;

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        this.url = event.target.result;
        // console.log(this.url);
      }
    }
  }

}
