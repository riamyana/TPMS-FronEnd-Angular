import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PassRequestComponent } from './pass-request.component';

describe('PassRequestComponent', () => {
  let component: PassRequestComponent;
  let fixture: ComponentFixture<PassRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PassRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PassRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
