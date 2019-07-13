import { TestBed } from '@angular/core/testing';

import { AuthenticationHttpInterceptorService } from './authentication-http-interceptor.service';

describe('AuthenticationHttpInterceptorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthenticationHttpInterceptorService = TestBed.get(AuthenticationHttpInterceptorService);
    expect(service).toBeTruthy();
  });
});
