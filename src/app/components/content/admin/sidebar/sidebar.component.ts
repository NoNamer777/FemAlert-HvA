import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import {
  faAddressCard,
  faAngleLeft,
  faAngleRight,
  faChartBar,
  faComments,
  faEdit,
  faHome,
  faSignOutAlt
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  /** Sidebar Boolean */
  IsOpen: boolean;

  /** Sidebar values */
  sidebarWidth: any;
  toggleButtonIsVisible: boolean;

  /** Sidebar icons */
  iconDashboard = faHome;
  iconStatistics = faChartBar;
  iconMembers = faAddressCard;
  iconEditRapport = faEdit;
  iconFAQ = faComments;
  iconSignOut = faSignOutAlt;
  iconOpen = faAngleRight;
  iconClose = faAngleLeft;

  constructor() { }

  ngOnInit(): void {
    this.IsOpen = true;
    this.detectMobile();
  }

  toggleSidebar(): void{
    if (this.IsOpen === true) {
      this.IsOpen = false;
      this.sidebarWidth = 3;
    } else {
      this.IsOpen = true;
      this.sidebarWidth = 15;
    }
  }

  @HostListener('window:resize')
  detectMobile(): void {
    if (window.innerWidth <= 760) {
      this.toggleButtonIsVisible = false;
      this.IsOpen = false;
      this.sidebarWidth = 3;
    } else {
      this.toggleButtonIsVisible = true;
    }
  }

}
