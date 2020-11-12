import { TestBed } from '@angular/core/testing';
import { AuthHeaderInterceptorService } from './auth-header-interceptor.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS, HttpHeaders } from '@angular/common/http';
import { UserService } from './user.service';
import { User } from '../models/User';
import { AuthenticateService } from './authenticate.service';
import { BACK_END_URL } from './questions.service';

describe('AuthHeaderInterceptorService', () => {
  let service: UserService;
  let authenticateService: AuthenticateService;
  let mockHttpClient: HttpTestingController;

  const TEST_USER = new User('bradbuur@hotmail.com', 'Test123');

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthHeaderInterceptorService, multi: true}]
    });
    service = TestBed.inject(UserService);
    authenticateService = TestBed.inject(AuthenticateService);
    mockHttpClient = TestBed.inject(HttpTestingController);
  });

  afterEach(() => mockHttpClient.verify());

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get token', () => {
    service.login(TEST_USER).subscribe(
      response => {
        expect(response).toBeTruthy();
      });

    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer Token');

    const request = mockHttpClient.expectOne(BACK_END_URL + '/authenticate/login');
    request.flush({},
      {
              headers,
              status: 200,
              statusText: 'OK'
            });

    expect(authenticateService.token).toEqual('Token');
  });
});
