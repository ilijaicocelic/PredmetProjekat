import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyRcServisComponent } from './my-rc-servis.component';

describe('MyRcServisComponent', () => {
  let component: MyRcServisComponent;
  let fixture: ComponentFixture<MyRcServisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyRcServisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyRcServisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
