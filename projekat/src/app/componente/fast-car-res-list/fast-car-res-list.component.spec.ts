import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FastCarResListComponent } from './fast-car-res-list.component';

describe('FastCarResListComponent', () => {
  let component: FastCarResListComponent;
  let fixture: ComponentFixture<FastCarResListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FastCarResListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FastCarResListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
