import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageUserTypeComponent } from './manage-user-type.component';

describe('ManageUserTypeComponent', () => {
  let component: ManageUserTypeComponent;
  let fixture: ComponentFixture<ManageUserTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageUserTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageUserTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
