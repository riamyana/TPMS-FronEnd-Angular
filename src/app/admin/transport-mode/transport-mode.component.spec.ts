import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransportModeComponent } from './transport-mode.component';

describe('TransportModeComponent', () => {
  let component: TransportModeComponent;
  let fixture: ComponentFixture<TransportModeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransportModeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransportModeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
