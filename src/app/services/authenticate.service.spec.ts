import { TestBed } from '@angular/core/testing';

import { AuthenticateService } from './authenticate.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('AuthenticateService', () => {
  let service: AuthenticateService;
  let mockHttpClient: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });
    service = TestBed.inject(AuthenticateService);
    mockHttpClient = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
