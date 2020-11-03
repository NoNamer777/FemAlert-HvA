import { Component, ElementRef, HostBinding, OnInit, ViewChild } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';

import { RapportsService } from '../../services/rapports.service';

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
export class NavbarComponent implements OnInit {

  @ViewChild('collapsableContent', { static: true }) collapsableContent: ElementRef;

  collapsed: boolean = null;

  constructor(private reportsService: RapportsService) {}

  ngOnInit(): void {
    this.collapsed = this.collapsableContent.nativeElement.classList.contains('collapse');
  }

  @HostBinding('hidden')
  get hidden(): boolean {
    return this.reportsService.isCreatingRapport;
  }

  toggleCollapsed(): void {
    this.collapsed = !this.collapsed;
  }
}
