import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTransportModeComponent } from './edit-transport-mode.component';

describe('EditTransportModeComponent', () => {
  let component: EditTransportModeComponent;
  let fixture: ComponentFixture<EditTransportModeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditTransportModeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTransportModeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
