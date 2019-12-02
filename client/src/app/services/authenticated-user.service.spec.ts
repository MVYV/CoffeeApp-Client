import { TestBed } from '@angular/core/testing';

import { AuthenticatedUserService } from './authenticated-user.service';

describe('AuthenticatedUserService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthenticatedUserService = TestBed.get(AuthenticatedUserService);
    expect(service).toBeTruthy();
  });
});
