import { TestBed } from '@angular/core/testing';

import { CarAdminGuardGuard } from './car-admin--guard.guard';

describe('CarAdminGuardGuard', () => {
  let guard: CarAdminGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CarAdminGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
