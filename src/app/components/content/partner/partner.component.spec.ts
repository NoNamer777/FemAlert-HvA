import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerComponent } from './partner.component';

describe('PartnerComponent', () => {
  let component: PartnerComponent;
  let fixture: ComponentFixture<PartnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartnerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PartnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
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
