import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { NavbarComponent } from './navbar.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

describe('NavbarComponent', () => {
  let fixture: ComponentFixture<NavbarComponent>;
  let component: NavbarComponent;
  let element: HTMLElement;
  let router: Router;

  let mockHttpClient: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        NoopAnimationsModule,
        RouterTestingModule.withRoutes( [
          {path: 'faq', redirectTo: ''}
        ])
      ],
      declarations: [
        NavbarComponent
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.debugElement.componentInstance;
    element = fixture.debugElement.nativeElement;
    router = TestBed.inject(Router);

    mockHttpClient = TestBed.inject(HttpTestingController);
    document.documentElement.style.width = '700px';

    router.navigate(['']);
    fixture.detectChanges();
  });

  it('should initialize collapsed state', () => {
    expect(component.collapsed).toBe(true);
  });

  it('should toggle collapsed on button press', async () => {
    const collapseBtn: HTMLButtonElement = element.querySelector('button.navbar-toggler');
    const collapsableContent: HTMLElement = element.querySelector('#navbarCollapse');

    expect(collapsableContent.classList.contains('collapse')).toBe(true);

    collapseBtn.click();
    fixture.detectChanges();

    await fixture.whenStable();
    await fixture.whenRenderingDone();

    expect(collapsableContent.classList.contains('collapse')).toBe(false);
  });

  it('should hide navbar when url includes /rapporteren', () => {
    expect(component.hidden).toBeFalsy();

    spyOnProperty(router, 'url').and.returnValue('/rapporteren/locatie');
    fixture.detectChanges();

    expect(component.hidden).toBeTruthy();
  });

  it('should hide navbar when url includes /partner', () => {
    expect(component.hidden).toBeFalsy();

    spyOnProperty(router, 'url').and.returnValue('/partner/members');
    fixture.detectChanges();

    expect(component.hidden).toBeTruthy();
  });

  it('should toggle collapsed on anchor click', async () => {
    const collapseBtn: HTMLButtonElement = element.querySelector('button.navbar-toggler');
    const collapsableContent: HTMLElement = element.querySelector('#navbarCollapse');
    const anchorElement: HTMLElement = element.querySelector(`a[routerlink='/faq']`);

    collapseBtn.click();
    fixture.detectChanges();

    await fixture.whenStable();
    await fixture.whenRenderingDone();

    expect(collapsableContent.classList.contains('collapse')).toBe(false);

    anchorElement.click();
    fixture.detectChanges();

    await fixture.whenStable();
    await fixture.whenRenderingDone();

    expect(collapsableContent.classList.contains('show')).toBe(false);
  });

  it('should not toggle collapsed when document is to wide to be toggleable.', () => {
    const faqLink: HTMLAnchorElement = element.querySelector(`a[routerLink='/faq']`);
    const collapsableContent: HTMLElement = element.querySelector('#navbarCollapse');

    document.documentElement.style.width = '800px';
    fixture.detectChanges();

    expect(collapsableContent.classList.contains('collapse')).toBe(true);

    faqLink.click();
    fixture.detectChanges();

    expect(collapsableContent.classList.contains('collapse')).toBe(true);
  });

});
