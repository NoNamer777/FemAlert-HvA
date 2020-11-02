import { ComponentFixture, flush, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { NavbarComponent } from './navbar.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('NavbarComponent', () => {
  let fixture: ComponentFixture<NavbarComponent>;
  let component: NavbarComponent;
  let element: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([]),
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
});
