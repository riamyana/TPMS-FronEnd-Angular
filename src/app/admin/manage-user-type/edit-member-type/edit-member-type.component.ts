import { MemberType } from './../../../_models/member/member-type';
import { LoaderService } from './../../../_services/loader/loader.service';
import { NotifierService } from './../../../_services/notifier/notifier.service';
import { MemberService } from './../../../_services/member/member.service';
import { FormErrorStateMatcher } from './../../../ErrorStateMatcher/FormErrorStateMatcher';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-member-type',
  templateUrl: './edit-member-type.component.html',
  styleUrls: ['./edit-member-type.component.scss']
})
export class EditMemberTypeComponent implements OnInit {
  memberTypeForm: FormGroup;
  matcher = new FormErrorStateMatcher();
  memberTypeData: MemberType;

  constructor(
    public dialogRef: MatDialogRef<EditMemberTypeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: MemberType,
    private formBuilder: FormBuilder,
    private memberService: MemberService,
    private notifierService: NotifierService,
    public loader: LoaderService
  ) {
    this.memberTypeData = this.data
  }

  ngOnInit(): void {
    this.memberTypeForm = this.formBuilder.group({
      memberType: [this.data.memberTypeName, Validators.required]
    });
  }

  get form() {
    return this.memberTypeForm.controls;
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onUpdate() {
    // this.check = true;
    this.memberTypeData.memberTypeName = this.form.memberType.value;
    this.memberService.updateMemberType(this.memberTypeData).subscribe(
      data => {
        console.log(data);
        this.notifierService.showNotification('Member Type Updated Successfully', 'OK', 'success');
        this.dialogRef.close(true);
      },
      err => {
        this.notifierService.showNotification('Something went wrong..! Please try again.', 'OK', 'error');
        console.log(err);
        this.dialogRef.close(false);
      });
  }

}
