import { ProofRequirement } from './../../../_models/proofRequirement';
import { Router } from '@angular/router';
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
  selector: 'app-save-proof-requirement',
  templateUrl: './save-proof-requirement.component.html',
  styleUrls: ['./save-proof-requirement.component.scss']
})
export class SaveProofRequirementComponent implements OnInit {
  proofForm: FormGroup;
  matcher = new FormErrorStateMatcher();
  proofData: ProofRequirement;
  memberTypeNmae: string;
  proofName: string;

  constructor(
    public dialogRef: MatDialogRef<SaveProofRequirementComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private proofService: ProofService,
    private notifierService: NotifierService,
    public loader: LoaderService,
    private memberService: MemberService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initForm();
    if (this.data.dialogType == "Update") {
      this.setValue();
    }
  }

  initForm() {
    this.proofForm = this.formBuilder.group({
      memberType: ['', Validators.required],
      addProof: [''],
      proofs: this.formBuilder.array([
        this.formBuilder.group({
          proofName: ['', Validators.required]
        })
      ])
    });
  }

  setValue() {
    this.form.memberType.setValue(this.data.memberTypeId);
    this.proofs.controls[0].get('proofName').setValue(this.data.proofId);
  }

  get form() {
    return this.proofForm.controls;
  }

  get proofs() {
    return this.proofForm.get('proofs') as FormArray;
  }

  // getProofControls() {
  //   return (this.proofForm.get('proofName') as FormArray).controls;
  // }

  onAddProof() {
    const proofLength = this.proofs.length;
    const addProofNo = +this.form.addProof.value;

    const newProof = this.formBuilder.group({
      proofName: ['', Validators.required]
    });


    for (let i = 0; i < addProofNo; i++) {
      this.proofs.push(newProof);
    }
  }

  onAdd() {
    for (let control of this.proofs.controls) {
      this.memberTypeNmae = this.data.member.filter(value => value.memberTypeId == this.form.memberType.value).map(value => value.memberTypeName);
      this.proofName = this.data.proof.filter(value => value.proofId == control.get('proofName').value).map(value => value.proofName);

      
      this.proofData = {
        memberTypeId: this.form.memberType.value,
        proofId: control.get('proofName').value,
        memberTypeName: this.memberTypeNmae[0],
        proofName: this.proofName[0]
      };

      this.proofService.addProofRequirement(this.proofData).subscribe(
        data => {
          this.notifierService.showNotification(NotifierMsg.SuccessAddMsg('Proof Requirement'), 'OK', 'success');
          this.dialogRef.close(data);
        },
        err => {
          this.notifierService.showNotification(NotifierMsg.errorMsg, 'OK', 'error');
          console.log(err);
        });
    }
  }

  onUpdate() {
    this.memberTypeNmae = this.data.member.filter(value => value.memberTypeId == this.form.memberType.value).map(value => value.memberTypeName);
    this.proofName = this.data.proof.filter(value => value.proofId == this.proofs.controls[0].get('proofName').value).map(value => value.proofName);

    this.proofData = {
      id: this.data.id,
      memberTypeId: this.form.memberType.value,
      proofId: this.proofs.controls[0].get('proofName').value,
      memberTypeName: this.memberTypeNmae[0],
      proofName: this.proofName[0]
    };

    this.proofService.updateProofRequirement(this.proofData).subscribe(
      data => {
        this.notifierService.showNotification(NotifierMsg.SuccessUpdateMsg('Proof Requirement'), 'OK', 'success');
        this.dialogRef.close(data);
      },
      err => {
        this.notifierService.showNotification(NotifierMsg.errorMsg, 'OK', 'error');
        console.log(err);
      });
  }

  onCancel() {
    this.dialogRef.close();
  }

  onProofDelete(i: number) {
    const len = this.proofs.length;

    if (len > 1) {
      this.proofs.removeAt(i);
    }
  }

}
