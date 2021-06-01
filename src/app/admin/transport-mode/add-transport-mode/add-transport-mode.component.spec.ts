import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTransportModeComponent } from './add-transport-mode.component';

describe('AddTransportModeComponent', () => {
  let component: AddTransportModeComponent;
  let fixture: ComponentFixture<AddTransportModeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTransportModeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTransportModeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
