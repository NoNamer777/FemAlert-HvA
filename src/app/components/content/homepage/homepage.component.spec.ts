import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { HomepageComponent } from './homepage.component';

describe('HomepageComponent', () => {
  let component: HomepageComponent;
  let element: HTMLElement;
  let fixture: ComponentFixture<HomepageComponent>;
  let testRouter: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ RouterTestingModule.withRoutes([]) ],
      declarations: [ HomepageComponent ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomepageComponent);
    component = fixture.componentInstance;
    element = fixture.debugElement.nativeElement;

    fixture.detectChanges();

    testRouter = TestBed.inject(Router);
  });

  it('should navigate to questions page', () => {
    expect(testRouter.url).toBe('/');

    const button: HTMLButtonElement = element.querySelector('button');
    const navigationSpy = spyOn(testRouter, 'navigate');

    expect(button.innerText).toBe('Meld het hier');

    button.click();

    expect(navigationSpy).toHaveBeenCalledWith([ '/questions' ]);
  });

});
