import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserService } from '../../../services/user.service';
import { BACK_END_URL } from '../../../services/questions.service';
import { HttpHeaders } from '@angular/common/http';
import { User } from '../../../models/User';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let service: UserService;
  let mockHttpClient: HttpTestingController;

  const TEST_USER = new User('bradbuur@hotmail.com', 'Test123');

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ FontAwesomeTestingModule, HttpClientTestingModule ],
      declarations: [ LoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    service = TestBed.inject(UserService);
    component = fixture.componentInstance;
    fixture.detectChanges();
    mockHttpClient = TestBed.inject(HttpTestingController);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('login form should be invalid when one or both fields are empty', () => {
    expect(component.loginForm.valid).toBeFalsy();

    component.loginForm.controls.email.setValue('test@gmail.com');
    expect(component.loginForm.valid).toBeFalsy();

    component.loginForm.controls.email.setValue('');
    component.loginForm.controls.password.setValue('testPassword');
    expect(component.loginForm.valid).toBeFalsy();
  });

  it('login form should be invalid when email is not genuine', () => {
    component.loginForm.controls.email.setValue('test');
    component.loginForm.controls.password.setValue('testPassword');
    expect(component.loginForm.valid).toBeFalsy();
  });

  it('should be valid login form', () => {
    component.loginForm.controls.email.setValue('test@gmail.com');
    component.loginForm.controls.password.setValue('testPassword');
    expect(component.loginForm.valid).toBeTruthy();
  });

  // it('should', () => {
  //   service.login(TEST_USER).subscribe(
  //     response => {
  //       expect(response).toBeTruthy();
  //     });
  //
  //   let headers = new HttpHeaders();
  //   headers = headers.set('Authorization', 'Bearer Token');
  //
  //   const request = mockHttpClient.expectOne(BACK_END_URL + '/authenticate/login');
  //   request.flush({},
  //     {
  //       headers,
  //       status: 200,
  //       statusText: 'OK'
  //     });
  // });
});
