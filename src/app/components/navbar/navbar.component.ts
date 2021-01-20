import { Component, ElementRef, HostBinding, OnInit, ViewChild } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { AuthenticateService } from '../../services/authenticate.service';
import { Router } from '@angular/router';

/** Animations that make the link font-size larger and centers the links a bit more. */
const COLLAPSED_SHOW_ANIMATION = trigger('collapseShow', [
  state('show', style({
    height: '100vh',
    padding: '3rem 0rem',
    paddingLeft: '6rem',
  })),
  state('collapse', style({
    height: '',
    padding: '',
  })),
  transition('collapse => show', [
    animate('0.4s')
  ]),
  transition('show => collapse', [
    animate('0.2s')
  ])
]);

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  providers: [],
  animations: [
    COLLAPSED_SHOW_ANIMATION,
  ],
})
export class NavbarComponent implements OnInit {

  /** A reference to the collapsable navbar. */
  @ViewChild('collapsableContent', { static: true }) collapsableContent: ElementRef;

  /** The internal collapsed state of the component. */
  collapsed: boolean = null;

  constructor(private authenticateService: AuthenticateService,
              private router: Router) {}

  ngOnInit(): void {
    // Initializes the collapsed state based on the classes of the element.
    this.collapsed = this.collapseState;
  }

  /** Hides the Header component when an User is creating a Rapport or User is using partner section. */
  @HostBinding('hidden')
  get hidden(): boolean {
    if (this.router.url.includes('/rapporteren') || this.router.url.includes('/partner')){
      return true;
    } else {
      return false;
    }
  }

  /** Toggles the component collapsed state. */
  toggleCollapsed(): void {
    // Only toggle the the collapsed state if the collapsable navbar should be able to collapse.
    if (!this.shouldCollapse) {
      this.collapsed = true;
      return;
    }
    this.collapsed = !this.collapsed;
  }

  /** Checks whether the collapsable navbar needs to be able to collapse. */
  get shouldCollapse(): boolean {
    const documentWithStyle = window.getComputedStyle(document.documentElement).width;
    const documentWith = parseInt(documentWithStyle.replace('px', ''));

    return documentWith < 768;
  }

  /** Checks whether the collapsable navbar is collapsed by element class. */
  private get collapseState(): boolean {
    return this.collapsableContent.nativeElement.classList.contains('collapse');
  }
}
