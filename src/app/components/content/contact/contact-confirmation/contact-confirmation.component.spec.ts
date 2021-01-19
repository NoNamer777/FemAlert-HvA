import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactConfirmationComponent } from './contact-confirmation.component';
import { Router } from '@angular/router';

describe('ContactConfirmationComponent', () => {
  let component: ContactConfirmationComponent;
  let fixture: ComponentFixture<ContactConfirmationComponent>;
  let router: Router;
  let element: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactConfirmationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should stop button send to home page ', () => {
    const button: HTMLButtonElement = element.querySelector('#btn-stop-report');
    const navigationSpy = spyOn(router, 'navigate');

    button.click();

    expect(navigationSpy).toHaveBeenCalledWith([ '/home' ]);
  });
});
