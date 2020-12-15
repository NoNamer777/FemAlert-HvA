import { Component, HostListener, OnInit } from '@angular/core';
import {
  faAddressCard,
  faAngleLeft,
  faAngleRight,
  faChartBar,
  faEdit,
  faHome,
  faSignOutAlt,
  faUserPlus
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
  iconAddUser = faUserPlus;
  iconSignOut = faSignOutAlt;
  iconOpen = faAngleRight;
  iconClose = faAngleLeft;

  constructor() { }

  ngOnInit(): void {
    this.IsOpen = true;
    this.detectMobile();
  }

  /**
   * If sidebar is open close sidebar
   * If sidebar is closed open sidebar
   */
  toggleSidebar(): void{
    if (this.IsOpen === true) {
      this.IsOpen = false;
      this.sidebarWidth = 3;
    } else {
      this.IsOpen = true;
      this.sidebarWidth = 15;
    }
  }

  /**
   * If window resize smaller than 760 pixels than sidebar will stay small
   */
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
