import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarComponent } from './sidebar.component';
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidebarComponent ],
      imports: [
        FontAwesomeTestingModule
      ],
      schemas: [
        NO_ERRORS_SCHEMA,
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle between false and true', () => {
    component.IsOpen = false;

    component.toggleSidebar();

    expect(component.IsOpen).toEqual(true);

    component.toggleSidebar();

    expect(component.IsOpen).toEqual(false);
  });

  it('should detect if window is smaller than 760 pixels', () => {
    spyOnProperty(window, 'innerWidth').and.returnValue(760);
    window.dispatchEvent(new Event('resize'));

    expect(component.IsOpen).toEqual(false);
    expect(component.toggleButtonIsVisible).toEqual(false);
  });
});
