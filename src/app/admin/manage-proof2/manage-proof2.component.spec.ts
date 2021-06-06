import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageProof2Component } from './manage-proof2.component';

describe('ManageProof2Component', () => {
  let component: ManageProof2Component;
  let fixture: ComponentFixture<ManageProof2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageProof2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageProof2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
