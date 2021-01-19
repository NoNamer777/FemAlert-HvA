import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarComponent } from './sidebar.component';
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthenticateService } from '../../../../services/authenticate.service';
import { User } from '../../../../models/User';

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;
  let service: AuthenticateService;

  const TEST_USER = new User();
  TEST_USER.emailAddress = 'TestUser@hotmail.com';
  TEST_USER.password = 'testPassword';
  TEST_USER.name = 'testName';
  TEST_USER.admin = true;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidebarComponent ],
      imports: [
        FontAwesomeTestingModule,
        HttpClientTestingModule,
        RouterTestingModule
      ],
      schemas: [
        NO_ERRORS_SCHEMA,
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarComponent);
    service = TestBed.inject(AuthenticateService);
    component = fixture.componentInstance;

    service.currentUser = TEST_USER;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle between false and true', () => {
    component.IsOpen = false;

    component.toggleSidebar();

    expect(component.IsOpen).toEqual(true);

    component.toggleSidebar();

    expect(component.IsOpen).toEqual(false);
  });

  it('should detect if window is smaller than 760 pixels', () => {
    spyOnProperty(window, 'innerWidth').and.returnValue(760);
    window.dispatchEvent(new Event('resize'));

    expect(component.IsOpen).toEqual(false);
    expect(component.toggleButtonIsVisible).toEqual(false);
  });
});
