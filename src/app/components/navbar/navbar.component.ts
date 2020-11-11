import { Component, ElementRef, HostBinding, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';

import { RapportsService } from '../../services/rapports.service';
import { NavigationEnd, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

const collapsedShowAnimation = trigger('collapseShow', [
  state('show', style({
    height: '100vh',
    padding: '3rem 0rem',
    paddingLeft: '6rem',
    opacity: 1,
  })),
  state('collapse', style({
    height: '',
    padding: '',
    opacity: '',
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
    collapsedShowAnimation,
  ],
})
export class NavbarComponent implements OnInit, OnDestroy {

  @ViewChild('collapsableContent', { static: true }) collapsableContent: ElementRef;

  collapsed: boolean = null;

  destroyed$ = new Subject<void>();

  constructor(private reportsService: RapportsService, private router: Router) {}

  ngOnInit(): void {
    this.collapsed = this.collapseState;

    this.router.events.pipe(takeUntil(this.destroyed$)).subscribe( (event) => {
      if (event instanceof NavigationEnd) this.collapsed = this.collapseState;
    });
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  @HostBinding('hidden')
  get hidden(): boolean {
    return this.reportsService.isCreatingRapport;
  }

  toggleCollapsed(): void {
    const documentWithStyle = window.getComputedStyle(document.documentElement).width;
    const documentWith = parseInt(documentWithStyle.replace('px', ''));

    if (documentWith >= 768) {
      this.collapsed = true;
      return;
    }
    this.collapsed = !this.collapsed;
  }

  private get collapseState(): boolean {
    return this.collapsableContent.nativeElement.classList.contains('collapse');
  }
}
