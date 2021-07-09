import { ErrorMsg } from './../../constants/errorMsg';
import { ErrorDialogComponent } from './../../dialog/error-dialog/error-dialog.component';
import { WizardItemDirective } from './../wizard-item.directive';
import { Component, OnInit, Input, Output, ContentChildren, QueryList, AfterContentInit, OnDestroy, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-wizard',
  templateUrl: './wizard.component.html',
  styleUrls: ['./wizard.component.scss']
})
export class WizardComponent implements OnInit, AfterContentInit, OnDestroy {
  @Input() continueLabel: string;
  @Input() showTickOnValue: boolean = false;
  @Output() submit = new EventEmitter<boolean>();
  @ContentChildren(WizardItemDirective) tabs: QueryList<WizardItemDirective>;
  private subscriptions: Subscription[] = [];

  tabCount = 0;
  selectedIndex: number = 0;
  selectedIndexChange = 0;
  showPrevious = false;
  showNext = false;
  showContinue = false;
  private _tabsArray: WizardItemDirective[];

  invalidNext = false;
  invalidPrev = false;

  constructor(
    public dialog: MatDialog
  ) { }

  ngAfterContentInit() {
    this.subscriptions.push(this.tabs.changes.subscribe(() => {
      this.setAndCheck();
    }));
    this.setAndCheck();

    console.log(this.tabs);
  }

  ngOnInit(): void {
  }

  setAndCheck() {
    this._tabsArray = this.tabs.toArray();
    this.tabCount = this._tabsArray.length;
    this.checkShowNext();
    this.checkShowPrevious();
    this.checkStatus();
  }

  previousStep() {
    if (this.selectedIndex != 0) {
      this.selectedIndex = this.selectedIndexChange - 1;
    }
    this.checkShowPrevious();
  }

  nextStep() {
    if (this.selectedIndex + 1 != this.tabCount) {
      this.selectedIndex = this.selectedIndexChange + 1;
    }
    this.checkShowNext();
  }

  checkShowNext() {
    this.showNext = this.selectedIndex + 1 != this.tabCount;
    // this._tabsArray.forEach((tab) => {
    //   this.showContinue = tab.control.valid;
    // });
    this.showContinue = this.selectedIndex + 1 === this.tabCount && this.selectedIndex != 0;
    this.checkStatus();
  }

  checkStatus() {
    this.invalidPrev = true;
    this.invalidNext = true;
  }

  checkShowPrevious() {
    this.showPrevious = this.selectedIndex != 0;
    this.checkStatus();
  }

  buttonContBack(event) {
    this.selectedIndexChange = event;
    this.selectedIndex = event;
    this.checkShowPrevious();
    this.checkShowNext();
  }

  submitClick() {
    debugger;
    let valid: boolean = true;
    this._tabsArray.forEach((tab) => {
      valid = tab.control.valid;
    });

    for (let tab of this._tabsArray) {
      if (!tab.control.valid) {
        valid = false;
        break;
      }
    }

    if (valid) {
      this.submit.emit(true);
    } else {
      const dialogRef = this.dialog.open(ErrorDialogComponent, { data: `${ErrorMsg.submitPassRequestErrorMsg}` });
      // this.submit.emit(true);
    }
  }

  ngOnDestroy(): void {
    if (this.subscriptions && this.subscriptions.length > 0) {
      this.subscriptions.forEach(s => s.unsubscribe());
    }
  }

}
