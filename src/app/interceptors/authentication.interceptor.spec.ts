import { inject, TestBed } from '@angular/core/testing';

import { AuthenticationInterceptor } from './authentication.interceptor';
import { AuthenticateService } from '../services/authenticate.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { User } from '../models/User';
import { BACK_END_URL } from '../services/questions.service';
import { HTTP_INTERCEPTORS, HttpHeaders } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

describe('AuthenticationInterceptor', () => {
  let authenticateService: AuthenticateService;
  let mockHttpClient: HttpTestingController;
  let store: any;

  const AUTH_KEY = 'Authorization';
  const TEST_TOKEN = 'Test Token';
  const TEST_USER = new User();

  TEST_USER.emailAddress = 'testEmail@hotmail.com';
  TEST_USER.password = 'Test123';

  const mockSessionStorage = {
    getItem: (key: string): string => key in store ? store[key] : null,
    setItem: (key: string, value: string) => store[key] = `${value}`,
    removeItem: (key: string) => delete store[key],
    clear: () => store = {},
  };

  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule,
      RouterTestingModule
    ],
    providers: [
      AuthenticateService,
      {provide: HTTP_INTERCEPTORS, useClass: AuthenticationInterceptor, multi: true}
      ]
  }));

  beforeEach(() => {
    store = {};

    spyOn(sessionStorage, 'getItem').and.callFake(mockSessionStorage.getItem);
    spyOn(sessionStorage, 'setItem').and.callFake(mockSessionStorage.setItem);
    spyOn(sessionStorage, 'removeItem').and.callFake(mockSessionStorage.removeItem);
    spyOn(sessionStorage, 'clear').and.callFake(mockSessionStorage.clear);

    authenticateService = TestBed.inject(AuthenticateService);
    mockHttpClient = TestBed.inject(HttpTestingController);
  });

  afterEach( () => {
    mockHttpClient.verify();
  });

  it('should get token from Authorization header', () => {
    authenticateService.login(TEST_USER).subscribe(
      response => expect(response).toBeTruthy()
    );

    const httpRequest = mockHttpClient.expectOne(BACK_END_URL + '/authenticate/login');
    httpRequest.flush({}, {headers: new HttpHeaders({Authorization: 'Bearer ' + TEST_TOKEN})});

    expect(authenticateService.token).toEqual(TEST_TOKEN);
  });

  // it('should add Authorization header', () => {
  //   authenticateService.login(TEST_USER).subscribe(
  //     response => expect(response).toBeTruthy()
  //   );
  //
  //   authenticateService.token = TEST_TOKEN;
  //
  //   const httpRequest = mockHttpClient.expectOne(BACK_END_URL + '/authenticate/login');
  //
  //   expect(httpRequest.request.headers.has(AUTH_KEY)).toEqual(true);
  // });

  it('should not add Authorization header', () => {
    authenticateService.login(TEST_USER).subscribe(
      response => {
        expect(response).toBeTruthy();
      }
    );

    const httpRequest = mockHttpClient.expectOne('http://localhost:8088/authenticate/login');

    expect(httpRequest.request.headers.has(AUTH_KEY)).toBeFalsy();
  });
});
