import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { NavbarComponent } from './navbar.component';

describe('NavbarComponent', () => {
  let fixture: ComponentFixture<NavbarComponent>;
  let component: NavbarComponent;
  let element: HTMLElement;

  let router: Router;
  let mockHttpClient: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'faq', redirectTo: '' }
        ]),
        HttpClientTestingModule,
        NoopAnimationsModule,
      ],
      declarations: [
        NavbarComponent,
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

  it('should toggle collapsed on navigation', async () => {
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
    const collapseBtn: HTMLButtonElement = element.querySelector('button.navbar-toggler');
    const faqLink: HTMLAnchorElement = element.querySelector(`a[routerLink='/faq']`);
    const collapsableContent: HTMLElement = element.querySelector('#navbarCollapse');
    const toggleCollapsedSpy = spyOn(component, 'toggleCollapsed');

    document.documentElement.style.width = '800px';
    fixture.detectChanges();

    expect(toggleCollapsedSpy).not.toHaveBeenCalled();
    expect(collapsableContent.classList.contains('collapse')).toBe(true);

    faqLink.click();
    fixture.detectChanges();

    expect(toggleCollapsedSpy).toHaveBeenCalled();
    expect(collapsableContent.classList.contains('collapse')).toBe(true);
  });
});
