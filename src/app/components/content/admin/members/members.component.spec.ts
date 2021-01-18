import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembersComponent } from './members.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { User } from '../../../../models/User';
import { BACK_END_URL } from '../../../../services/questions.service';
import { UserService } from '../../../../services/user.service';
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing';

describe('MembersComponent', () => {
  let component: MembersComponent;
  let fixture: ComponentFixture<MembersComponent>;
  let service: UserService;
  let mockHttpClient: HttpTestingController;

  const dummyUsers = [
    new User('USR-1'),
    new User('USR-2'),
    new User('USR-3'),
    new User('USR-4'),
    new User('USR-5')
    ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        FontAwesomeTestingModule
      ],
      declarations: [ MembersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MembersComponent);
    component = fixture.componentInstance;
    mockHttpClient = TestBed.inject(HttpTestingController);
    service = TestBed.inject(UserService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should delete user', () => {
    component.users = [
      new User('USR-1'),
      new User('USR-2'),
      new User('USR-3'),
      new User('USR-4'),
      new User('USR-5')
    ];

    component.deleteUser(1);

    const request = mockHttpClient.expectOne(`${BACK_END_URL}/user/${component.users[1].id}`);
    request.flush({}, {
      status: 200,
      statusText: 'OK'
    });

    expect(component.users.length).toEqual(dummyUsers.length - 1);
    expect(component.users).toEqual([
      new User('USR-1'),
      new User('USR-3'),
      new User('USR-4'),
      new User('USR-5'),
    ]);
  });

  it('should show error when deleting failed', () => {
    component.users = [
      new User('USR-1'),
      new User('USR-2'),
      new User('USR-3'),
      new User('USR-4'),
      new User('USR-5')
    ];

    component.deleteUser(1);

    const request = mockHttpClient.expectOne(`${BACK_END_URL}/user/${component.users[1].id}`);
    request.error(new ErrorEvent('Error'));

    expect(component.users.length).toEqual(dummyUsers.length);
    expect(component.getUserError).toEqual(true);
  });

  it ('should get users', () => {
    const request = mockHttpClient.expectOne(`${BACK_END_URL}/user`);
    request.flush(dummyUsers);

    expect(component.users).toEqual(dummyUsers);
  });

  it ('should get no users found message', () => {
    const request = mockHttpClient.expectOne(`${BACK_END_URL}/user`);
    request.flush([]);

    expect(component.users.length).toEqual(0);
    expect(component.noUserFound).toEqual(true);
  });

  it ('should get error when getting users', () => {
    const request = mockHttpClient.expectOne(`${BACK_END_URL}/user`);
    request.error(new ErrorEvent('Error'));

    expect(component.users.length).toEqual(0);
    expect(component.getUserError).toEqual(true);
  });
});
