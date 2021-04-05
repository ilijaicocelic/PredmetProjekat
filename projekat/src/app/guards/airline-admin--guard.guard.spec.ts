import { TestBed } from '@angular/core/testing';

import { AirlineAdminGuardGuard } from './airline-admin--guard.guard';

describe('AirlineAdminGuardGuard', () => {
  let guard: AirlineAdminGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AirlineAdminGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
