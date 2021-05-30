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
    this.getMemberType();
    // this.onAddProof();
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


  // getProofControls() {
  //   return (this.proofForm.get('proofName') as FormArray).controls;
  // }

  onAddProof() {
    const proofLength = this.proofs.length;
    const addProofNo = +this.form.addProof.value;
    // const newProof = new FormControl('');

    const newProof = this.formBuilder.group({
      proofName: ['', Validators.required]
    });


    for (let i = 0; i < addProofNo; i++) {
      this.proofs.push(newProof);
    }
  }

  onAdd() {
    // this.proofData = {
    //   memberTypeId: this.form.memberType.value,
    //   proofName
    // };

    for (let control of this.proofs.controls) {
      this.proofData = {
        memberTypeId: this.form.memberType.value,
        proofName: control.get('proofName').value,
      };

      this.proofService.addProof(this.proofData).subscribe(
        data => {
          // console.log(data);
          this.notifierService.showNotification('Member Type Added Successfully', 'OK', 'success');
          this.dialogRef.close(data);
        },
        err => {
          this.notifierService.showNotification('Something went wrong..! Please try again.', 'OK', 'error');
          console.log(err);
          // this.dialogRef.close();
        });
    }
  }

  onCancel() {
    this.dialogRef.close();
  }

  getMemberType() {
    this.memberService.getMemberType().subscribe(
      data => {
        this.memberTypeData = data;
      },
      err => {
        if(err.status == 401 || err.stats == 403) {
          this.router.navigateByUrl('admin/login');
        } else {
          this.notifierService.showNotification('Something went wrong..! Please try again.', 'OK', 'error');
        }
      });
  }

  onProofDelete(i: number) {
    const len=this.proofs.length;

    if (len > 1) {
      this.proofs.removeAt(i);
    }
  }

}
