import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlyghtsTableComponent } from './flyghts-table.component';

describe('FlyghtsTableComponent', () => {
  let component: FlyghtsTableComponent;
  let fixture: ComponentFixture<FlyghtsTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlyghtsTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlyghtsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
