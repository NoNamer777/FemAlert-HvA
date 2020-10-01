import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';

import { QuestionComponent } from './question.component';
import { By } from '@angular/platform-browser';

describe('QuestionComponent', () => {
  let component: QuestionComponent;
  let fixture: ComponentFixture<QuestionComponent>;
  let router: Router;
  let element: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ RouterTestingModule.withRoutes([]) ],
      declarations: [ QuestionComponent ],
      schemas: [ NO_ERRORS_SCHEMA ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionComponent);
    component = fixture.componentInstance;
    element = fixture.debugElement.nativeElement;

    fixture.detectChanges();

    router = TestBed.inject(Router);
  });

  it('should stop button send to home page ', () => {
    const button: HTMLButtonElement = element.querySelector('#btn-stop-report');
    const navigationSpy = spyOn(router, 'navigate');

    button.click();

    expect(navigationSpy).toHaveBeenCalledWith([ '/home' ]);
  });

  it('should previous button send to previous page ', () => {
    const button: HTMLButtonElement = element.querySelector('#btn-previous');
    const navigationSpy = spyOn(router, 'navigate');

    button.click();

    expect(navigationSpy).toHaveBeenCalledWith([ '/home' ]);
  });

  // Todo change when the next page is implemented.
  it('should navigate to the next page', () => {
    const button: HTMLButtonElement = element.querySelector('#btn-next');
    const logSpy = spyOn(console, 'log');

    component.questionsForm.controls.condition.setValue(true);
    component.questionsForm.controls.email.setValue('o.wellner@telfort.nl');
    component.questionsForm.controls.dateTime.setValue(new Date());

    fixture.detectChanges();

    button.click();

    expect(logSpy).toHaveBeenCalledWith('going to next screen');
  });

  it('should toggle button colors correctly', () => {
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

  it('should add or remove events on click', () => {
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

      expect(eventButtons.item(buttonIdx).classList.contains('btn-success')).toBe(shouldContain);

      if (shouldContain) expect(component.questionsForm.value.events).toContain(eventCheckbox.innerText);
      else expect(component.questionsForm.value.events).not.toContain(eventCheckbox.innerText);
    }

    clickEventButton(eventButtons.item(2).id, 2);
    checkEventsValue(2, true);

    clickEventButton(eventButtons.item(3).id, 3);
    checkEventsValue(3, true);

    clickEventButton(eventButtons.item(2).id, 2);
    checkEventsValue(2, false);
  });
});
