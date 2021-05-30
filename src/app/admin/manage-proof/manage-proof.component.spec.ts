import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageProofComponent } from './manage-proof.component';

describe('ManageProofComponent', () => {
  let component: ManageProofComponent;
  let fixture: ComponentFixture<ManageProofComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageProofComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageProofComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
