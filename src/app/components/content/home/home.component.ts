import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ReportsService } from '../../../services/reports.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [],
})
export class HomeComponent implements OnInit {

  constructor(private router: Router, private reportsService: ReportsService) {}

  ngOnInit(): void {}

  onStartReport(): void {
    this.router.navigate(['/location-picker']).then(() => this.reportsService.isCreatingReport = true);
  }
}
