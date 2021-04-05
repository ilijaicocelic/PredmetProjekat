import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRcServisComponent } from './add-rc-servis.component';

describe('AddRcServisComponent', () => {
  let component: AddRcServisComponent;
  let fixture: ComponentFixture<AddRcServisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddRcServisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRcServisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
