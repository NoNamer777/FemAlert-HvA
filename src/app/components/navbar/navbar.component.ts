import { Component, HostBinding, OnInit } from '@angular/core';

import { RapportsService } from '../../services/rapports.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  providers: [],
})
export class NavbarComponent implements OnInit {

  constructor(private reportsService: RapportsService) {}

  ngOnInit(): void {}

  @HostBinding('hidden')
  get hidden(): boolean {
    return this.reportsService.isCreatingRapport;
  }
}
