import { TestBed } from '@angular/core/testing';

import { UnregistredGuardGuard } from './unregistred-guard.guard';

describe('UnregistredGuardGuard', () => {
  let guard: UnregistredGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(UnregistredGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
