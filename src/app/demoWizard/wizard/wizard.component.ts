import { WizardItemDirective } from './../wizard-item.directive';
import { Component, OnInit, Input, Output, ContentChildren, QueryList, AfterContentInit, OnDestroy } from '@angular/core';
import * as EventEmitter from 'events';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-wizard',
  templateUrl: './wizard.component.html',
  styleUrls: ['./wizard.component.scss']
})
export class WizardComponent implements OnInit, AfterContentInit, OnDestroy {
  @Input() continueLabel: string;
  @Input() showTickOnValue: boolean = false;
  @Output() continue = new EventEmitter();
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

  constructor() { }

  ngAfterContentInit() {
    this.subscriptions.push(this.tabs.changes.subscribe(amt => {
      this.setAndCheck();
    }));
    this.setAndCheck();

    // console.log("tabs");
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

  checkShowNext() {
    this.showNext = this.selectedIndex + 1 != this.tabCount;
    this.showContinue =  this.continueLabel != null && this.continueLabel != '' && this.selectedIndex + 1 === this.tabCount && this.selectedIndex != 0;
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

  ngOnDestroy(): void {
    if (this.subscriptions && this.subscriptions.length > 0) {
      this.subscriptions.forEach(s => s.unsubscribe());
    }
  }

}
