import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactComponent } from './contact.component';
import { Router } from '@angular/router';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BACK_END_URL } from '../../../services/questions.service';

describe('ContactComponent', () => {
  let component: ContactComponent;
  let fixture: ComponentFixture<ContactComponent>;
  let router: Router;
  let mockHttpClient: HttpTestingController;
  let element: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule,
        FontAwesomeTestingModule,
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([
          { path: 'home', redirectTo: '' },
          { path: 'contact-bevesting', redirectTo: '' },
        ]),
      ],
      declarations: [ ContactComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactComponent);
    component = fixture.componentInstance;

    element = fixture.debugElement.nativeElement;

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



  it('should navigate to contact confirmation page', () => {

    const button: HTMLButtonElement = element.querySelector('#btn-send');
    const navigationSpy = spyOn(router, 'navigate');

    expect(navigationSpy).not.toHaveBeenCalled();

    expect(button.innerText).toBe('Verstuur');

    component.contactForm.controls.name.setValue("dummy");
    component.contactForm.controls.subject.setValue("test");
    component.contactForm.controls.email.setValue('dummy@gmail.com');
    component.contactForm.controls.question.setValue("this is a test");
    fixture.detectChanges();

    button.click();
    fixture.detectChanges();
    const request = mockHttpClient.expectOne(`${BACK_END_URL}/contact/request-contact`, component.contactForm.value);
    request.flush(component.contactForm.value);
    expect(navigationSpy).toHaveBeenCalledWith([ '/contact-bevestiging' ]);

  });


});
