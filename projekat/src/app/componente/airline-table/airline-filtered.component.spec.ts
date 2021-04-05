import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AirlineFilteredComponent } from './airline-filtered.component';

describe('AirlineFilteredComponent', () => {
  let component: AirlineFilteredComponent;
  let fixture: ComponentFixture<AirlineFilteredComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AirlineFilteredComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AirlineFilteredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
