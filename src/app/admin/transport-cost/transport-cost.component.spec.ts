import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransportCostComponent } from './transport-cost.component';

describe('TransportCostComponent', () => {
  let component: TransportCostComponent;
  let fixture: ComponentFixture<TransportCostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransportCostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransportCostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
