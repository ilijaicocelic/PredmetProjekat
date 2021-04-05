import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FastCarReservationsComponent } from './fast-car-reservations.component';

describe('FastCarReservationsComponent', () => {
  let component: FastCarReservationsComponent;
  let fixture: ComponentFixture<FastCarReservationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FastCarReservationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FastCarReservationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
