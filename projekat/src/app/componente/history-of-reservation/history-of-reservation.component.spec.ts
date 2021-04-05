import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryOfReservationComponent } from './history-of-reservation.component';

describe('HistoryOfReservationComponent', () => {
  let component: HistoryOfReservationComponent;
  let fixture: ComponentFixture<HistoryOfReservationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoryOfReservationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryOfReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
