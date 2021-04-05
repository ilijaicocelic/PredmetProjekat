import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeFlightComponent } from './change-flight.component';

describe('ChangeFlightComponent', () => {
  let component: ChangeFlightComponent;
  let fixture: ComponentFixture<ChangeFlightComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeFlightComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeFlightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
