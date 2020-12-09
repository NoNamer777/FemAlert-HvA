import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerComponent } from './partner.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/User';
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BACK_END_URL } from '../../../services/questions.service';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('PartnerComponent', () => {
  let component: PartnerComponent;
  let fixture: ComponentFixture<PartnerComponent>;
  let mockHttpClient: HttpTestingController;
  let service: UserService;
  let element: HTMLElement;

  const TEST_USER = new User();

  TEST_USER.emailAddress = 'testEmail@hotmail.com';
  TEST_USER.password = 'Test123';

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartnerComponent ],
      imports: [
        HttpClientTestingModule,
        FontAwesomeTestingModule,
        ReactiveFormsModule,
        FormsModule,
        RouterTestingModule.withRoutes(
          [{path: 'partner', children: [
              {path: 'dashboard', redirectTo: ''}
            ]}]
        )
      ],
      schemas: [
        NO_ERRORS_SCHEMA,
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PartnerComponent);
    mockHttpClient = TestBed.inject(HttpTestingController);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
    service = TestBed.inject(UserService);
    fixture.detectChanges();
  });

  function updateForm(email: string, password: string): void {
    component.loginForm.controls.email.setValue(email);
    component.loginForm.controls.password.setValue(password);
  }

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('login form should be invalid when one or both fields are empty', () => {
    expect(component.loginForm.controls.email.valid).toBeFalsy();
    expect(component.loginForm.controls.password.valid).toBeFalsy();

    updateForm(TEST_USER.emailAddress, '');
    fixture.detectChanges();

    expect(component.loginForm.controls.email.valid).toBeTruthy();
    expect(component.loginForm.controls.password.valid).toBeFalsy();

    updateForm('', TEST_USER.password);
    fixture.detectChanges();

    expect(component.loginForm.controls.email.valid).toBeFalsy();
    expect(component.loginForm.controls.password.valid).toBeTruthy();
  });

  it('login form should be invalid when email is not genuine', () => {
    updateForm('notAnEmail', TEST_USER.password);
    fixture.detectChanges();

    expect(component.loginForm.controls.email.valid).toBeFalsy();
    expect(component.loginForm.controls.password.valid).toBeTruthy();
  });

  it('should be valid login form', () => {
    updateForm(TEST_USER.emailAddress, TEST_USER.password);
    fixture.detectChanges();

    expect(component.loginForm.controls.email.valid).toBeTruthy();
    expect(component.loginForm.controls.password.valid).toBeTruthy();
  });

  it('should show invalid credentials', () => {
    updateForm(TEST_USER.emailAddress, TEST_USER.password);
    fixture.detectChanges();

    component.onSubmit();

    const request = mockHttpClient.expectOne(BACK_END_URL + '/authenticate/login');
    request.error(new ErrorEvent('Invalid Credentials'), { status: 0, statusText: 'Invalid Credentials' });

    expect(component.showInvalidCredentials).toEqual(true);
  });

  it('should not show invalid credentials', () => {
    updateForm(TEST_USER.emailAddress, TEST_USER.password);
    fixture.detectChanges();

    component.onSubmit();

    const request = mockHttpClient.expectOne(BACK_END_URL + '/authenticate/login');
    request.flush({},
      {
        status: 200,
        statusText: 'OK'
      });

    expect(component.showInvalidCredentials).toEqual(false);
  });

  it('should show invalid credentials if login form is invalid', () => {
    updateForm('NoEmail', TEST_USER.password);
    fixture.detectChanges();

    component.onSubmit();

    expect(component.showInvalidCredentials).toEqual(true);
  });
});
