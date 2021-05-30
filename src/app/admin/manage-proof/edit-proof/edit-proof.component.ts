import { Router } from '@angular/router';
import { MemberService } from './../../../_services/member/member.service';
import { LoaderService } from './../../../_services/loader/loader.service';
import { NotifierService } from './../../../_services/notifier/notifier.service';
import { ProofService } from './../../../_services/proof/proof.service';
import { Proof } from './../../../_models/Proof/proof';
import { MemberType } from './../../../_models/member/member-type';
import { FormErrorStateMatcher } from './../../../ErrorStateMatcher/FormErrorStateMatcher';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-proof',
  templateUrl: './edit-proof.component.html',
  styleUrls: ['./edit-proof.component.scss']
})
export class EditProofComponent implements OnInit {
  proofForm: FormGroup;
  matcher = new FormErrorStateMatcher();
  memberTypeData: MemberType[];
  proofData: Proof;

  constructor(
    public dialogRef: MatDialogRef<EditProofComponent>,
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
    this.getMemberType();
    this.getProofsByMemberId(this.data.memberTypeId);
  }

  getMemberType() {
    this.memberService.getMemberType().subscribe(
      data => {
        this.memberTypeData = data;
      },
      err => {
        if (err.status == 401 || err.stats == 403) {
          this.router.navigateByUrl('admin/login');
        } else {
          this.notifierService.showNotification('Something went wrong..! Please try again.', 'OK', 'error');
        }
      });
  }

  getProofsByMemberId(id: number) {
    this.proofService.getProofByMemberId(id).subscribe(
      data => {
        // const newProof = new FormControl('');
        this.proofs.controls[0].get('proofName').setValue('')
        const newProof = this.formBuilder.group({
          proofName: ['', Validators.required]
        });

        this.proofs.push(newProof);
      }
    );
  }

  initForm() {
    this.proofForm = this.formBuilder.group({
      memberType: ['', Validators.required],
      addProof: [''],
      proofs: this.formBuilder.array([])
      // proofs:this.formBuilder.array([
      //   new FormControl('Angular'),
      //   new FormControl('ABc')

      // ])

    });
  }

  get form() {
    return this.proofForm.controls;
  }

  get proofs() {
    return this.proofForm.get('proofs') as FormArray;
  }

  onAddProof() {

  }

  onAdd() {

  }

  onCancel() {

  }

  onProofDelete(i: number) {

  }
}
