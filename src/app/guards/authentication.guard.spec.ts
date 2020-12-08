import { TestBed } from '@angular/core/testing';

import { AuthenticationGuard } from './authentication.guard';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('AuthenticationGuard', () => {
  let guard: AuthenticationGuard;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        AuthenticationGuard,
        {provide: Router, useValue: router},
      ],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
      ],
    });
  });

  beforeEach(() => {
    guard = TestBed.inject(AuthenticationGuard);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  // it('should navigate to Partner Component if user is not authenticated', () => {
  //   expect(guard.canActivate()).toBe(false);
  // });
});
