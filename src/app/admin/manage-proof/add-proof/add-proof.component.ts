import { Proof } from './../../../_models/Proof/proof';
import { Router } from '@angular/router';
import { MemberType } from './../../../_models/member/member-type';
import { MemberService } from './../../../_services/member/member.service';
import { LoaderService } from './../../../_services/loader/loader.service';
import { NotifierService } from './../../../_services/notifier/notifier.service';
import { ProofService } from './../../../_services/proof/proof.service';
import { FormErrorStateMatcher } from './../../../ErrorStateMatcher/FormErrorStateMatcher';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotifierMsg } from 'src/app/constants/notifierMsg';

@Component({
  selector: 'app-add-proof',
  templateUrl: './add-proof.component.html',
  styleUrls: ['./add-proof.component.scss']
})
export class AddProofComponent implements OnInit {
  proofForm: FormGroup;
  matcher = new FormErrorStateMatcher();
  memberTypeData: MemberType[];
  proofData: Proof;

  constructor(
    public dialogRef: MatDialogRef<AddProofComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Proof,
    private formBuilder: FormBuilder,
    private proofService: ProofService,
    private notifierService: NotifierService,
    public loader: LoaderService,
    private memberService: MemberService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initForm();

    if (this.data) {
      this.addValue();
    }
  }

  initForm() {
    this.proofForm = this.formBuilder.group({
      proofName: ['', Validators.required]
    });
  }

  addValue() {
    this.form.proofName.setValue(this.data.proofName);
  }

  get form() {
    return this.proofForm.controls;
  }

  get proofs() {
    return this.proofForm.get('proofs') as FormArray;
  }

  onAdd() {
    this.proofService.addProof(this.form.proofName.value).subscribe(
      data => {
        console.log(data);
        this.dialogRef.close(data);
        this.notifierService.showNotification(NotifierMsg.SuccessAddMsg('Proof Name'), 'OK', 'success');
      },
      err => {
        this.notifierService.showNotification(NotifierMsg.errorMsg, 'OK', 'error');
        console.log(err);
        this.dialogRef.close(false);
      });
  }

  onUpdate() {
    const data: Proof = {
      proofId: this.data.proofId,
      proofName: this.form.proofName.value
    }

    this.proofService.updateProof(data).subscribe(
      data => {
        console.log(data);
        this.dialogRef.close(data);
        this.notifierService.showNotification(NotifierMsg.SuccessAddMsg('Proof Name'), 'OK', 'success');
      },
      err => {
        this.notifierService.showNotification(NotifierMsg.errorMsg, 'OK', 'error');
        console.log(err);
        this.dialogRef.close(false);
      });
  }

  onCancel() {
    this.dialogRef.close();
  }

}
