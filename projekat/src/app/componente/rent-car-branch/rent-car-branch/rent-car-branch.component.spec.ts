import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RentCarBranchComponent } from './rent-car-branch.component';

describe('RentCarBranchComponent', () => {
  let component: RentCarBranchComponent;
  let fixture: ComponentFixture<RentCarBranchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RentCarBranchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RentCarBranchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
