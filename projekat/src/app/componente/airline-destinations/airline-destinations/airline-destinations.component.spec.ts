import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AirlineDestinationsComponent } from './airline-destinations.component';

describe('AirlineDestinationsComponent', () => {
  let component: AirlineDestinationsComponent;
  let fixture: ComponentFixture<AirlineDestinationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AirlineDestinationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AirlineDestinationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
