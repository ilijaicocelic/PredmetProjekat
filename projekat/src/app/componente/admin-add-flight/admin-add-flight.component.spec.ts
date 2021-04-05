import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddFlightComponent } from './admin-add-flight.component';

describe('AdminAddFlightComponent', () => {
  let component: AdminAddFlightComponent;
  let fixture: ComponentFixture<AdminAddFlightComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminAddFlightComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAddFlightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
