import { Component, HostBinding, OnInit } from '@angular/core';
import { ReportsService } from '../../services/reports.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  providers: [],
})
export class NavbarComponent implements OnInit {

  constructor(private reportsService: ReportsService) {}

  ngOnInit(): void {}

  @HostBinding('hidden')
  get hidden(): boolean {
    return this.reportsService.isCreatingReport;
  }
}
