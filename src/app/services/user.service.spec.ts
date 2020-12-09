import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { User } from '../models/User';

describe('UserService', () => {
  let service: UserService;
  let mockHttpClient: HttpTestingController;

  const EXPECTED_USER = new User();
  EXPECTED_USER.emailAddress = 'tester1@hotmail.com';
  EXPECTED_USER.password = 'Test123';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ]
    });

    service = TestBed.inject(UserService);
    mockHttpClient = TestBed.inject(HttpTestingController);
  });

  afterEach(() => mockHttpClient.verify());

  // it('should login', () => {
  //   service.login(EXPECTED_USER).subscribe(
  //     result => {
  //       expect(result.emailAddress).toBe(EXPECTED_USER.emailAddress);
  //     }
  //   );
  // });
});
