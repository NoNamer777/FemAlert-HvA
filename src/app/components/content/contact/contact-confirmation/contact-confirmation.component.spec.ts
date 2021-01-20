import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactConfirmationComponent } from './contact-confirmation.component';
import { Router } from '@angular/router';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('ContactConfirmationComponent', () => {
  let component: ContactConfirmationComponent;
  let fixture: ComponentFixture<ContactConfirmationComponent>;
  let router: Router;
  let element: HTMLElement;
  let mockHttpClient: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FontAwesomeTestingModule,
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([
          { path: 'home', redirectTo: '' },
        ]),
      ],
      declarations: [ ContactConfirmationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactConfirmationComponent);
    component = fixture.componentInstance;

    element = fixture.debugElement.nativeElement;

    router = TestBed.inject(Router);
    mockHttpClient = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  it('should s to home page ', () => {
    const button: HTMLButtonElement = element.querySelector('#btn-stop-report');
    const navigationSpy = spyOn(router, 'navigate');

    button.click();

    expect(navigationSpy).toHaveBeenCalledWith([ '/home' ]);
  });
});
