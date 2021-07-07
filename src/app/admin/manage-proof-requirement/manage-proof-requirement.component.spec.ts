import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageProofRequirementComponent } from './manage-proof-requirement.component';

describe('ManageProofRequirementComponent', () => {
  let component: ManageProofRequirementComponent;
  let fixture: ComponentFixture<ManageProofRequirementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageProofRequirementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageProofRequirementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
