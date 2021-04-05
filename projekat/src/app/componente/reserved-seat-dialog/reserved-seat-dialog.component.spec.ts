import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservedSeatDialogComponent } from './reserved-seat-dialog.component';

describe('ReservedSeatDialogComponent', () => {
  let component: ReservedSeatDialogComponent;
  let fixture: ComponentFixture<ReservedSeatDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReservedSeatDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservedSeatDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
