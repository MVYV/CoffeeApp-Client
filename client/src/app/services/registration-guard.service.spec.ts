import { TestBed } from '@angular/core/testing';

import { RegistrationGuardService } from './registration-guard.service';

describe('RegistrationGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RegistrationGuardService = TestBed.get(RegistrationGuardService);
    expect(service).toBeTruthy();
  });
});
