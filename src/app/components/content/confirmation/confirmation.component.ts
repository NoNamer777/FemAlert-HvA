import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { RapportsService } from '../../../services/rapports.service';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss'],
  providers: [],
})
export class ConfirmationComponent implements OnInit {

  iconQuit = faTimes;

  constructor(private router: Router, private rapportsService: RapportsService) {}

  ngOnInit(): void {}

  onStop(): void {
    this.router.navigate(['/home']);
    this.rapportsService.isCreatingRapport = false;
    this.rapportsService.rapport = null;
  }
}
