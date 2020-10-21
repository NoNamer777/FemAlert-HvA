import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let element: HTMLElement;
  let fixture: ComponentFixture<HomeComponent>;
  let testRouter: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ RouterTestingModule.withRoutes([]) ],
      declarations: [ HomeComponent ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
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

    expect(navigationSpy).toHaveBeenCalledWith([ '/location-picker' ]);
  });

});
