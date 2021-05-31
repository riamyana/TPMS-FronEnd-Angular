import { LoaderService } from './../../../_services/loader/loader.service';
import { NotifierService } from './../../../_services/notifier/notifier.service';
import { MemberService } from './../../../_services/member/member.service';
import { FormErrorStateMatcher } from './../../../ErrorStateMatcher/FormErrorStateMatcher';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-member',
  templateUrl: './add-member.component.html',
  styleUrls: ['./add-member.component.scss']
})
export class AddMemberComponent implements OnInit {

  memberTypeForm: FormGroup;
  matcher = new FormErrorStateMatcher();

  constructor(
    public dialogRef: MatDialogRef<AddMemberComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private memberService: MemberService,
    private notifierService: NotifierService,
    public loader: LoaderService
  ) { }

  ngOnInit(): void {
    this.memberTypeForm = this.formBuilder.group({
      memberType: ['', Validators.required]
    });
  }

  get form() {
    return this.memberTypeForm.controls;
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onAdd() {
    this.memberService.addMemberType(this.form.memberType.value).subscribe(
      data => {
        console.log(data);
        this.dialogRef.close(data);
        this.notifierService.showNotification('Member Type Added Successfully', 'OK', 'success');
      },
      err => {
        this.notifierService.showNotification('Something went wrong..! Please try again.', 'OK', 'error');
        console.log(err);
        this.dialogRef.close(false);
      });
  }

}