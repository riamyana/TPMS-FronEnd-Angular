import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateTransportCostComponent } from './add-update-transport-cost.component';

describe('AddUpdateTransportCostComponent', () => {
  let component: AddUpdateTransportCostComponent;
  let fixture: ComponentFixture<AddUpdateTransportCostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddUpdateTransportCostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUpdateTransportCostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
