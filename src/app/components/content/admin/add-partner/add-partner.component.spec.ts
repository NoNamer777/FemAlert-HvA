import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPartnerComponent } from './add-partner.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AuthenticateService } from '../../../../services/authenticate.service';
import { User } from '../../../../models/User';
import { BACK_END_URL } from '../../../../services/questions.service';

describe('AddPartnerComponent', () => {
  let component: AddPartnerComponent;
  let service: AuthenticateService;
  let fixture: ComponentFixture<AddPartnerComponent>;
  let mockHttpClient: HttpTestingController;
  let element: HTMLElement;

  const TEST_USER = new User();
  TEST_USER.emailAddress = 'TestUser@hotmail.com';
  TEST_USER.password = 'testPassword';
  TEST_USER.name = 'testName';

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPartnerComponent ],
      imports: [
        HttpClientTestingModule,
        FormsModule,
        ReactiveFormsModule
      ],
      schemas: [
        NO_ERRORS_SCHEMA,
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPartnerComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(AuthenticateService);
    element = fixture.debugElement.nativeElement;
    mockHttpClient = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle admin value (True <=> False)', () => {
    const onButton: HTMLButtonElement = element.querySelector('#onButton');
    const offButton: HTMLButtonElement = element.querySelector('#offButton');

    offButton.click();

    expect(component.addMemberForm.controls.admin.value).toEqual(false);

    onButton.click();

    expect(component.addMemberForm.controls.admin.value).toEqual(true);
  });

  it('should check if email is valid', () => {
    component.addMemberForm.controls.email.setValue('wrongEmail');
    component.onSubmit();
    expect(component.emailIsInvalid).toEqual(true);

    component.addMemberForm.controls.email.setValue(TEST_USER.emailAddress);
    component.onSubmit();
    expect(component.emailIsInvalid).toEqual(false);
  });

  it('should check if password is valid', () => {
    component.addMemberForm.controls.password.setValue('1234');
    component.onSubmit();
    expect(component.passwordIsInvalid).toEqual(true);

    component.addMemberForm.controls.password.setValue(TEST_USER.password);
    component.onSubmit();
    expect(component.passwordIsInvalid).toEqual(false);
  });

  it('should check if confirm password is valid', () => {
    component.addMemberForm.controls.password.setValue(TEST_USER.password);

    component.addMemberForm.controls.confirmPassword.setValue('validPassword');
    component.onSubmit();
    expect(component.confirmPasswordIsInvalid).toEqual(true);

    component.addMemberForm.controls.confirmPassword.setValue(TEST_USER.password);
    component.onSubmit();
    expect(component.confirmPasswordIsInvalid).toEqual(false);
  });

  it('should check if company name is valid', () => {
    component.addMemberForm.controls.companyName.setValue('');
    component.onSubmit();
    expect(component.passwordIsInvalid).toEqual(true);

    component.addMemberForm.controls.password.setValue(TEST_USER.name);
    component.onSubmit();
    expect(component.passwordIsInvalid).toEqual(false);
  });

  it('should check if form is valid', () => {
    component.addMemberForm.controls.email.setValue(TEST_USER.emailAddress);
    component.addMemberForm.controls.password.setValue(TEST_USER.password);
    component.addMemberForm.controls.confirmPassword.setValue(TEST_USER.password);
    component.addMemberForm.controls.companyName.setValue(TEST_USER.name);

    component.onSubmit();

    expect(component.addMemberForm.valid).toEqual(true);
  });

  it('should add user when form is valid', () => {
    const IsReset = spyOn(component.addMemberForm, 'reset');

    component.addMemberForm.controls.email.setValue(TEST_USER.emailAddress);
    component.addMemberForm.controls.password.setValue(TEST_USER.password);
    component.addMemberForm.controls.confirmPassword.setValue(TEST_USER.password);
    component.addMemberForm.controls.companyName.setValue(TEST_USER.name);

    component.onSubmit();

    expect(component.addMemberForm.valid).toEqual(true);

    const request = mockHttpClient.expectOne(`${BACK_END_URL}/authenticate/register`);
    request.flush(TEST_USER);

    expect(IsReset).toHaveBeenCalled();
  });

  it('should get error when response has error', () => {
    component.addMemberForm.controls.email.setValue(TEST_USER.emailAddress);
    component.addMemberForm.controls.password.setValue(TEST_USER.password);
    component.addMemberForm.controls.confirmPassword.setValue(TEST_USER.password);
    component.addMemberForm.controls.companyName.setValue(TEST_USER.name);

    component.onSubmit();

    expect(component.addMemberForm.valid).toEqual(true);

    const request = mockHttpClient.expectOne(`${BACK_END_URL}/authenticate/register`);
    request.error(new ErrorEvent('Network Error'));

    expect(component.gotNetworkError).toEqual(true);
  });
});
