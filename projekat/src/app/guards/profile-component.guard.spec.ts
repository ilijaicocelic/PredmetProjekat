import { TestBed } from '@angular/core/testing';

import { ProfileComponentGuard } from './profile-component.guard';

describe('ProfileComponentGuard', () => {
  let guard: ProfileComponentGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ProfileComponentGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
