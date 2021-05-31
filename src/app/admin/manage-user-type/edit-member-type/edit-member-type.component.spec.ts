import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMemberTypeComponent } from './edit-member-type.component';

describe('EditMemberTypeComponent', () => {
  let component: EditMemberTypeComponent;
  let fixture: ComponentFixture<EditMemberTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditMemberTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditMemberTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
