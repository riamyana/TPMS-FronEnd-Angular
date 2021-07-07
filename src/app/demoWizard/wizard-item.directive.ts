import { MemberProfileComponent } from './../member/member-profile/member-profile.component';
import { CdkPortal } from '@angular/cdk/portal';
import { AfterContentInit, ContentChild, Directive, Injector, Input, OnInit } from '@angular/core';
import { ControlContainer, NgControl, FormGroup } from '@angular/forms';

@Directive({
  selector: '[wizard-icon], [wizardTabIcon]'
})
export class WizardTabIconDirective extends CdkPortal {
  @Input() iconName: string = '';
}

@Directive({
  selector: '[wizard-content]'
})
export class WizardContentDirective extends CdkPortal {
}

@Directive({
  selector: 'app-Wizard-Item'
})
export class WizardItemDirective implements OnInit, AfterContentInit {
  @ContentChild(WizardTabIconDirective) icon: WizardTabIconDirective;
  @ContentChild(WizardContentDirective) contentView: WizardContentDirective;
  @Input() label: string = '';
  
  showIcon = false;

  control: ControlContainer

  constructor(
    private _injector: Injector
  ) { }

  ngOnInit() {
    if (!this.control) {
      this.control = this._injector.get(ControlContainer);
      console.log(this.control.valid);
    }
  }

  ngAfterContentInit() {
    if (this.icon) {
      this.showIcon = true;
    }
    if (!this.contentView) {
      throw new Error('There is no wizard-content directive that is needed to display the content in the wizard');
    }

    // this.contentView.context = { label: this.label };

    // console.log(this.contentView);
    // console.log(this.icon);
    // console.log(this.contentView.isAttached);
    // this.contentView.attach()
  }

}
