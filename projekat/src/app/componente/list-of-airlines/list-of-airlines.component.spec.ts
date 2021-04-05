import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfAirlinesComponent } from './list-of-airlines.component';

describe('ListOfAirlinesComponent', () => {
  let component: ListOfAirlinesComponent;
  let fixture: ComponentFixture<ListOfAirlinesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListOfAirlinesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOfAirlinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
