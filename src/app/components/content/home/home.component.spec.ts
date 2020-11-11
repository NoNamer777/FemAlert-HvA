import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { HomeComponent } from './home.component';
import { RapportsService } from '../../../services/rapports.service';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let element: HTMLElement;
  let fixture: ComponentFixture<HomeComponent>;

  let rapportsService: RapportsService;
  let testRouter: Router;
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
      ],
      declarations: [
        HomeComponent,
      ],
      providers: [
        RapportsService,
      ],
      schemas: [
        NO_ERRORS_SCHEMA,
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    rapportsService = TestBed.inject(RapportsService);
    testRouter = TestBed.inject(Router);
    mockHttpClient = TestBed.inject(HttpTestingController);

    component = fixture.componentInstance;
    element = fixture.debugElement.nativeElement;
    store = {};

    spyOn(sessionStorage, 'getItem').and.callFake(mockSessionStorage.getItem);
    spyOn(sessionStorage, 'setItem').and.callFake(mockSessionStorage.setItem);
    spyOn(sessionStorage, 'removeItem').and.callFake(mockSessionStorage.removeItem);
    spyOn(sessionStorage, 'clear').and.callFake(mockSessionStorage.clear);

    component.ngOnInit();

    fixture.detectChanges();
  });

  it('should navigate to questions page', () => {
    const button: HTMLButtonElement = element.querySelector('button');
    const navigationSpy = spyOn(testRouter, 'navigate');

    expect(navigationSpy).not.toHaveBeenCalled();
    expect(rapportsService.isCreatingRapport).toBe(false);

    expect(button.innerText).toBe('Meld het hier');

    button.click();
    fixture.detectChanges();

    expect(navigationSpy).toHaveBeenCalledWith([ '/locatie' ]);
    expect(rapportsService.isCreatingRapport).toBe(true);
  });

});
