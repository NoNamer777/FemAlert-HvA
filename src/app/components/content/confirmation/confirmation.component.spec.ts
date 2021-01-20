import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing';

import { ConfirmationComponent } from './confirmation.component';

describe('ConfirmationComponent', () => {
  let fixture: ComponentFixture<ConfirmationComponent>;
  let component: ConfirmationComponent;
  let element: HTMLElement;

  let router: Router;
  let mockHttpClient: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FontAwesomeTestingModule,
        RouterTestingModule.withRoutes([]),
        HttpClientTestingModule,
      ],
      declarations: [
        ConfirmationComponent,
      ],
      schemas: [
        NO_ERRORS_SCHEMA,
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmationComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;

    router = TestBed.inject(Router);
    mockHttpClient = TestBed.inject(HttpTestingController);

    fixture.detectChanges();
  });

  it('should stop button send to home page ', () => {
    const button: HTMLButtonElement = element.querySelector('#btn-stop-report');
    const navigationSpy = spyOn(router, 'navigate');

    button.click();

    expect(navigationSpy).toHaveBeenCalledWith([ '/home' ]);
  });
});
