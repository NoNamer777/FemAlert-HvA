import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactComponent } from './contact.component';
import { RapportsService } from '../../../services/rapports.service';
import { Router } from '@angular/router';

describe('ContactComponent', () => {
  let component: ContactComponent;
  let fixture: ComponentFixture<ContactComponent>;
  let rapportsService: RapportsService;
  let testRouter: Router;
  let element: HTMLElement;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should navigate to contact confirmation page', () => {
    const button: HTMLButtonElement = element.querySelector('button');
    const navigationSpy = spyOn(testRouter, 'navigate');

    expect(navigationSpy).not.toHaveBeenCalled();
    expect(rapportsService.isCreatingRapport).toBe(false);

    expect(button.innerText).toBe('Verstuur');

    button.click();
    fixture.detectChanges();

    expect(navigationSpy).toHaveBeenCalledWith([ '/contact-bevestiging' ]);
    expect(rapportsService.isCreatingRapport).toBe(true);
  });

  it('should stop button send to home page ', () => {
    const button: HTMLButtonElement = element.querySelector('#btn-stop-report');
    const navigationSpy = spyOn(router, 'navigate');

    button.click();

    expect(navigationSpy).toHaveBeenCalledWith([ '/home' ]);
  });
});
