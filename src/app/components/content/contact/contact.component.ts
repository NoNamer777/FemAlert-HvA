import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { RapportsService } from '../../../services/rapports.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { EmailMoreInfoDialogComponent } from '../question/email-more-info-dialog/email-more-info-dialog.component';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  iconQuit = faTimes;

  /** The questions form */
 contactForm = new FormGroup({
    events: new FormControl([]),
    name: new FormControl(),
    companyName: new FormControl(),
    question: new FormControl(),
    email: new FormControl(null, [ Validators.required, Validators.email]),
  });

  constructor(
    private router: Router,
    private rapportsService: RapportsService,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
  }

  /** Handles going back to the Home Page, thus stopping the process of filling in the form. */

  onStop(): void {
    this.router.navigate(['/home']);

    this.rapportsService.isCreatingRapport = false;
  }

  /** Opens the dialog that provides information about why we need the email address of an User. */
  onMIEmail(): void {
    this.dialog.open(EmailMoreInfoDialogComponent, {
      hasBackdrop: true,
      closeOnNavigation: true,
      position: {
        top: '40%',
        left: '10%',
      },
    });
  }

}
