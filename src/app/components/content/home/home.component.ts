import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { RapportsService } from '../../../services/rapports.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [],
})
export class HomeComponent implements OnInit {

  constructor(private router: Router, private reportsService: RapportsService) {}

  ngOnInit(): void {}

  onStartReport(): void {
    this.router.navigate(['/location-picker']);

    this.reportsService.isCreatingRapport = true;
  }
}
