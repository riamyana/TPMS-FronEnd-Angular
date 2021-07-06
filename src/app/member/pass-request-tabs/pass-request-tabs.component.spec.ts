import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PassRequestTabsComponent } from './pass-request-tabs.component';

describe('PassRequestTabsComponent', () => {
  let component: PassRequestTabsComponent;
  let fixture: ComponentFixture<PassRequestTabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PassRequestTabsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PassRequestTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
