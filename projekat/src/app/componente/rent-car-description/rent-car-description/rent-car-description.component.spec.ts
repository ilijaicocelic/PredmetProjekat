import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RentCarDescriptionComponent } from './rent-car-description.component';

describe('RentCarDescriptionComponent', () => {
  let component: RentCarDescriptionComponent;
  let fixture: ComponentFixture<RentCarDescriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RentCarDescriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RentCarDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
