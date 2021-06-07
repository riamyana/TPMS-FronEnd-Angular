import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateStationComponent } from './add-update-station.component';

describe('AddUpdateStationComponent', () => {
  let component: AddUpdateStationComponent;
  let fixture: ComponentFixture<AddUpdateStationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddUpdateStationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUpdateStationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
