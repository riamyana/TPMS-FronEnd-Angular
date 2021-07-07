import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveProofRequirementComponent } from './save-proof-requirement.component';

describe('SaveProofRequirementComponent', () => {
  let component: SaveProofRequirementComponent;
  let fixture: ComponentFixture<SaveProofRequirementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaveProofRequirementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveProofRequirementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
