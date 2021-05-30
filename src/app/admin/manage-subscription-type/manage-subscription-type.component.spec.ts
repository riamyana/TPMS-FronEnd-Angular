import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageSubscriptionTypeComponent } from './manage-subscription-type.component';

describe('ManageSubscriptionTypeComponent', () => {
  let component: ManageSubscriptionTypeComponent;
  let fixture: ComponentFixture<ManageSubscriptionTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageSubscriptionTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageSubscriptionTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
