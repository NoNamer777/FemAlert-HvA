import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing';

import { QuestionComponent } from './question.component';
import { BACK_END_URL } from '../../../services/questions.service';
import { EventsService, MOCK_EVENTS } from '../../../services/events.service';
import { Event } from '../../../models/Event';
import { Rapport } from '../../../models/Rapport';
import { Address } from '../../../models/Address';
import { RapportsService } from '../../../services/rapports.service';
import { SessionStorageService } from '../../../services/session-storage.service';

describe('QuestionComponent', () => {
  let component: QuestionComponent;
  let fixture: ComponentFixture<QuestionComponent>;
  let element: HTMLElement;

  let rapportsService: RapportsService;

  let router: Router;
  let mockHttpClient: HttpTestingController;
  let store: any;

  const mockSessionStorage = {
    getItem: (key: string): string => key in store ? store[key] : null,
    setItem: (key: string, value: string) => store[key] = `${value}`,
    removeItem: (key: string) => delete store[key],
    clear: () => store = {},
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([]),
        HttpClientTestingModule,
        FontAwesomeTestingModule,
        MatDialogModule,
        NoopAnimationsModule,
      ],
      declarations: [
        QuestionComponent,
      ],
      schemas: [
        NO_ERRORS_SCHEMA,
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    store = {};

    spyOn(sessionStorage, 'getItem').and.callFake(mockSessionStorage.getItem);
    spyOn(sessionStorage, 'setItem').and.callFake(mockSessionStorage.setItem);
    spyOn(sessionStorage, 'removeItem').and.callFake(mockSessionStorage.removeItem);
    spyOn(sessionStorage, 'clear').and.callFake(mockSessionStorage.clear);

    sessionStorage.setItem('fem-alert', JSON.stringify({
      isCreatingRapport: true,
      rapport: {
        address: {
          businessName: '',
          formattedAddress: 'Amsterdam, Amsterdam'
        }
      }
    }));

    fixture = TestBed.createComponent(QuestionComponent);
    component = fixture.componentInstance;
    element = fixture.debugElement.nativeElement;

    router = TestBed.inject(Router);
    mockHttpClient = TestBed.inject(HttpTestingController);

    rapportsService = TestBed.inject(RapportsService);
    TestBed.inject(SessionStorageService);
    TestBed.inject(EventsService);

    fixture.detectChanges();
  });

  afterEach(() => mockHttpClient.verify());

  async function getEvents(): Promise<void> {
    const eventsRequest = mockHttpClient.expectOne(`${BACK_END_URL}/event`);

    eventsRequest.flush(MOCK_EVENTS);
    fixture.detectChanges();

    expect(eventsRequest.request.method).toBe('GET');
  }

  it('should stop button send to home page ', async () => {
    await getEvents();

    const button: HTMLButtonElement = element.querySelector('#btn-stop-report');
    const navigationSpy = spyOn(router, 'navigate');

    button.click();

    expect(navigationSpy).toHaveBeenCalledWith([ '/home' ]);
  });

  it('should use the mock events when error on getting events from the back-end', async () => {
    const getEventsRequest = mockHttpClient.expectOne(`${BACK_END_URL}/event`);

    getEventsRequest.error(new ErrorEvent('NO_NETWORK_ERROR'), { statusText: 'Unknown error', status: 0 });
    fixture.detectChanges();
    await fixture.whenStable();

    expect(component.incidentTypes).toEqual(MOCK_EVENTS);
  });

  it('should previous button send to previous page ', async () => {
    await getEvents();

    const button: HTMLButtonElement = element.querySelector('#btn-previous');
    const navigationSpy = spyOn(router, 'navigate');

    button.click();

    expect(navigationSpy).toHaveBeenCalledWith([ '/rapporteren/locatie' ]);
  });

  it('should not navigate to the next page on cancel', async () => {
    await getEvents();

    const button: HTMLButtonElement = element.querySelector('#btn-next');
    const navigationSpy = spyOn(router, 'navigate');
    const date = new Date();

    component.questionsForm.controls.acceptedTerms.setValue(true);
    component.questionsForm.controls.email.setValue('dummy@gmail.com');
    component.questionsForm.controls.dateTime.setValue(date);
    component.questionsForm.controls.events.setValue([ MOCK_EVENTS[0] ]);
    component.questionsForm.controls.extraInfo.setValue(false);
    component.questionsForm.controls.victimSupport.setValue(false);
    fixture.detectChanges();

    expect(button.disabled).toBe(false);

    button.click();
    fixture.detectChanges();

    const cancelBtnElement: HTMLButtonElement =
      document.documentElement.querySelector('app-confirm-send-dialog button.btn-light');

    cancelBtnElement.click();
    fixture.detectChanges();
    await fixture.whenStable();

    mockHttpClient.expectNone(`${BACK_END_URL}/rapport`);
    expect(navigationSpy).not.toHaveBeenCalled();
  });

  it('should navigate to the next page on accept', async () => {
    await getEvents();

    const button: HTMLButtonElement = element.querySelector('#btn-next');
    const navigationSpy = spyOn(router, 'navigate');
    const date = new Date();

    component.questionsForm.controls.acceptedTerms.setValue(true);
    component.questionsForm.controls.email.setValue('dummy@gmail.com');
    component.questionsForm.controls.dateTime.setValue(date);
    component.questionsForm.controls.events.setValue([ MOCK_EVENTS[0] ]);
    component.questionsForm.controls.extraInfo.setValue(false);
    component.questionsForm.controls.victimSupport.setValue(false);
    fixture.detectChanges();

    expect(button.disabled).toBe(false);

    button.click();
    fixture.detectChanges();

    const confirmBtnElement: HTMLButtonElement =
      document.documentElement.querySelector('app-confirm-send-dialog button.bg-grey2');

    confirmBtnElement.click();
    fixture.detectChanges();
    await fixture.whenStable();

    const saveRapportRequest = mockHttpClient.expectOne(`${BACK_END_URL}/rapport`);

    saveRapportRequest.flush(new Rapport(
      null,
      new Address('important address details', 'optional business name'),
      'dummy@gmail.com',
      null,
      [],
      date.toString().replace('T', ' '),
      null,
      false,
      false
    ));

    expect(navigationSpy).toHaveBeenCalledWith(['/bevestiging-melding']);
    expect(saveRapportRequest.request.method).toBe('POST');
  });

  it('should still navigate to the next page on accept while error', async () => {
    await getEvents();

    const button: HTMLButtonElement = element.querySelector('#btn-next');
    const navigationSpy = spyOn(router, 'navigate');
    const date = new Date();

    component.questionsForm.controls.acceptedTerms.setValue(true);
    component.questionsForm.controls.email.setValue('dummy@gmail.com');
    component.questionsForm.controls.dateTime.setValue(date);
    component.questionsForm.controls.events.setValue([ MOCK_EVENTS[0] ]);
    component.questionsForm.controls.extraInfo.setValue(false);
    component.questionsForm.controls.victimSupport.setValue(false);
    fixture.detectChanges();

    expect(button.disabled).toBe(false);

    button.click();
    fixture.detectChanges();

    const confirmBtnElement: HTMLButtonElement =
      document.documentElement.querySelector('app-confirm-send-dialog button.bg-grey2');

    confirmBtnElement.click();
    fixture.detectChanges();
    await fixture.whenStable();

    const saveRapportRequest = mockHttpClient.expectOne(`${BACK_END_URL}/rapport`);

    saveRapportRequest.error(new ErrorEvent('NO_NETWORK_ERROR'), { status: 0, statusText: 'unknown error' });

    expect(navigationSpy).toHaveBeenCalledWith(['/bevestiging-melding']);
  });

  it('should toggle button colors correctly', async () => {
    await getEvents();

    const trueBtn: DebugElement = fixture.debugElement.query(By.css('#extra-info-true-btn'));
    const falseBtn: DebugElement = fixture.debugElement.query(By.css('#extra-info-false-btn'));

    // Clicks on a button and checks if the results match the expectations.
    function toggleButtonColor(btnId: string, expectedResult: boolean): void {
      const button = fixture.debugElement.query(By.css(btnId));

      button.triggerEventHandler('click', null);

      fixture.detectChanges();

      expect(component.questionsForm.value.extraInfo).toBe(expectedResult);
      expect(trueBtn.nativeElement.classList.contains('btn-success')).toBe(expectedResult);
      expect(falseBtn.nativeElement.classList.contains('bg-grey2')).toBe(expectedResult);
      expect(falseBtn.nativeElement.classList.contains('btn-success')).toBe(!expectedResult);
    }

    // Check the starting value and starting button colors.
    expect(component.questionsForm.value.extraInfo).toBe(true);
    expect(trueBtn.nativeElement.classList.contains('btn-success')).toBe(true);
    expect(falseBtn.nativeElement.classList.contains('bg-grey2')).toBe(true);
    expect(falseBtn.nativeElement.classList.contains('btn-success')).toBe(false);

    // Click on the `no` button, expect the value to be toggled.
    toggleButtonColor('#extra-info-false-btn', false);

    // Click on the `no` button, expect the value to be the same.
    toggleButtonColor('#extra-info-false-btn', false);

    // Click on the `yes` button, expect the value to be toggled again.
    toggleButtonColor('#extra-info-true-btn', true);
  });

  it('should add or remove events on click', async () => {
    await getEvents();

    const eventButtons: HTMLCollectionOf<Element> = element.getElementsByClassName('event-btn');

    // Clicks a specific incident type button.
    function clickEventButton(buttonId: string, buttonIdx: number): void {
      const button = fixture.debugElement.query(By.css(`#${buttonId}`));

      expect(eventButtons.item(buttonIdx)).toEqual(button.nativeElement);

      button.triggerEventHandler('click', null);
      fixture.detectChanges();
    }

    // Checks if an incident type is added / removed from the form value.
    function checkEventsValue(buttonIdx: number, shouldContain: boolean): void {
      const eventCheckbox: HTMLElement = eventButtons.item(buttonIdx).querySelector('small');
      const events: Event[] = component.questionsForm.value.events;
      let contains = false;

      for (const event of events) {
        if (event.name === eventCheckbox.innerText) {
          contains = true;
          break;
        }
      }
      expect(eventButtons.item(buttonIdx).classList.contains('btn-success')).toBe(shouldContain);
      expect(shouldContain).toBe(contains);
    }

    clickEventButton(eventButtons.item(2).id, 2);
    checkEventsValue(2, true);

    clickEventButton(eventButtons.item(3).id, 3);
    checkEventsValue(3, true);

    clickEventButton(eventButtons.item(2).id, 2);
    checkEventsValue(2, false);
  });

  it('should show pop up when email information was clicked', async () => {
    await getEvents();

    const emailInformationLink: HTMLElement = element.querySelector(`label[for='email'] small`);

    expect(emailInformationLink).not.toBe(null);

    emailInformationLink.click();

    fixture.detectChanges();

    const popupDialogContainer = document.documentElement.querySelector('app-email-more-info-dialog');
    expect(popupDialogContainer).not.toBe(null);
  });
});
