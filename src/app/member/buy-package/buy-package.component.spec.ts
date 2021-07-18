import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyPackageComponent } from './buy-package.component';

describe('BuyPackageComponent', () => {
  let component: BuyPackageComponent;
  let fixture: ComponentFixture<BuyPackageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuyPackageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyPackageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
