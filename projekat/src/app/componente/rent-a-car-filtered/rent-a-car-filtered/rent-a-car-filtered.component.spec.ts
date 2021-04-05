import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RentACarFilteredComponent } from './rent-a-car-filtered.component';

describe('RentACarFilteredComponent', () => {
  let component: RentACarFilteredComponent;
  let fixture: ComponentFixture<RentACarFilteredComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RentACarFilteredComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RentACarFilteredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
