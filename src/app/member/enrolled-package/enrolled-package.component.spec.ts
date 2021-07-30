import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnrolledPackageComponent } from './enrolled-package.component';

describe('EnrolledPackageComponent', () => {
  let component: EnrolledPackageComponent;
  let fixture: ComponentFixture<EnrolledPackageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnrolledPackageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnrolledPackageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
