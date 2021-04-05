import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyFlightListComponent } from './my-flight-list.component';

describe('MyFlightListComponent', () => {
  let component: MyFlightListComponent;
  let fixture: ComponentFixture<MyFlightListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyFlightListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyFlightListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
