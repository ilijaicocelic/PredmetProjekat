import { TestBed } from '@angular/core/testing';

import { RegistredGuardGuard } from './registred-guard.guard';

describe('RegistredGuardGuard', () => {
  let guard: RegistredGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(RegistredGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
