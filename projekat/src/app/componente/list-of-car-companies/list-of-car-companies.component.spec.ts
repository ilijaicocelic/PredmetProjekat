import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfCarCompaniesComponent } from './list-of-car-companies.component';

describe('ListOfCarCompaniesComponent', () => {
  let component: ListOfCarCompaniesComponent;
  let fixture: ComponentFixture<ListOfCarCompaniesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListOfCarCompaniesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOfCarCompaniesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
