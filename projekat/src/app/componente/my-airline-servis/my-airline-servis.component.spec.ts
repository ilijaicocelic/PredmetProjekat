import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyAirlineServisComponent } from './my-airline-servis.component';

describe('MyAirlineServisComponent', () => {
  let component: MyAirlineServisComponent;
  let fixture: ComponentFixture<MyAirlineServisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyAirlineServisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyAirlineServisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
