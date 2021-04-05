import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationCarDialogComponent } from './reservation-car-dialog.component';

describe('ReservationCarDialogComponent', () => {
  let component: ReservationCarDialogComponent;
  let fixture: ComponentFixture<ReservationCarDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReservationCarDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservationCarDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
