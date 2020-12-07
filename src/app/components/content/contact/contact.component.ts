import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { RapportsService } from '../../../services/rapports.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  iconQuit = faTimes;

  constructor(
    private router: Router,
    private rapportsService: RapportsService,
  ) {}

  ngOnInit(): void {
  }

  /** Handles going back to the Home Page, thus stopping the process of filling in the form. */

  onStop(): void {
    this.router.navigate(['/home']);

    this.rapportsService.isCreatingRapport = false;
  }

}
