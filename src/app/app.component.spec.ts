import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';

import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ RouterTestingModule.withRoutes([]) ],
      declarations: [ AppComponent ],
      schemas: [ NO_ERRORS_SCHEMA ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
  });

  function getTestingObjects(): {
    component: AppComponent,
    debugElement: DebugElement,
    element: HTMLElement,
  } {
    return {
      component: fixture.componentInstance,
      debugElement: fixture.debugElement,
      element: fixture.debugElement.nativeElement,
    };
  }

  it('should create the app', () => {
    const { component } = getTestingObjects();

    expect(component).toBeTruthy();
  });

  it(`should have as title 'femalert-app'`, () => {
    const { component } = getTestingObjects();

    expect(component.title).toEqual('femalert-app');
  });
});
