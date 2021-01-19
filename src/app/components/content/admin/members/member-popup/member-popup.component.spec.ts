import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberPopupComponent } from './member-popup.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { User } from '../../../../../models/User';
import { BACK_END_URL } from '../../../../../services/questions.service';

describe('MemberPopupComponent', () => {
  let component: MemberPopupComponent;
  let fixture: ComponentFixture<MemberPopupComponent>;
  let element: HTMLElement;
  let mockHttpClient: HttpTestingController;

  const TEST_USER = new User();
  TEST_USER.emailAddress = 'TestUser@hotmail.com';
  TEST_USER.id = 'USR-001';
  TEST_USER.name = 'testName';
  TEST_USER.admin = false;

  const dialogMock = {
    close: () => {}
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        MatDialogModule
      ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: TEST_USER },
        { provide: MatDialogRef, useValue: dialogMock }
      ],
      declarations: [ MemberPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberPopupComponent);
    component = fixture.componentInstance;
    element = fixture.debugElement.nativeElement;
    mockHttpClient = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  function updateFormWithValidUser(): void {
    component.memberForm.controls.email.setValue(TEST_USER.emailAddress);
    component.memberForm.controls.companyName.setValue(TEST_USER.name);
    component.memberForm.controls.admin.setValue(TEST_USER.admin);
  }

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle admin value (True <=> False)', () => {
    const onButton: HTMLButtonElement = element.querySelector('#onButtonEdit');
    const offButton: HTMLButtonElement = element.querySelector('#offButtonEdit');

    offButton.click();

    expect(component.memberForm.controls.admin.value).toEqual(false);

    onButton.click();

    expect(component.memberForm.controls.admin.value).toEqual(true);
  });

  it('should be invalid email and name', () => {
    component.memberForm.controls.email.setValue('wrongEmail');
    component.memberForm.controls.companyName.setValue('');

    component.onSubmit();

    expect(component.emailIsInvalid).toBeTruthy();
    expect(component.companyNameIsInvalid).toBeTruthy();
  });

  it('should not get error', () => {
    updateFormWithValidUser();

    component.onSubmit();

    const request = mockHttpClient.expectOne(`${BACK_END_URL}/user/${TEST_USER.id}`);
    request.flush(TEST_USER);

    expect(component.gotNetworkError).toBeFalsy();
  });

  it('should get error', () => {
    updateFormWithValidUser();

    component.onSubmit();

    const request = mockHttpClient.expectOne(`${BACK_END_URL}/user/${TEST_USER.id}`);
    request.error(new ErrorEvent('Network error'));

    expect(component.gotNetworkError).toBeTruthy();
  });
});
