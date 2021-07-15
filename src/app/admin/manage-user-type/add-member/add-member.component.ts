import { Router } from '@angular/router';
import { NotifierMsg } from './../../../constants/notifierMsg';
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
    public loader: LoaderService,
    private router: Router
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
        this.dialogRef.close(data);
        this.notifierService.showNotification(NotifierMsg.SuccessAddMsg('Member Type'), 'OK', 'success');
      },
      err => {
        if (err.status == 401 || err.stats == 403) {
          this.router.navigateByUrl('admin/login');
        } else if ((err.error.message).includes('requires a unique value')) {
          this.notifierService.showNotification('This member type already exists..!', 'OK', 'error');
        } else {
          this.notifierService.showNotification(NotifierMsg.errorMsg, 'OK', 'error');
        }
        console.log(err);
        this.dialogRef.close(false);
      });
  }

}
