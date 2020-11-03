/// <reference types="@types/googlemaps" />

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { faCalendarAlt, faTimes } from '@fortawesome/free-solid-svg-icons';

import { RapportsService } from '../../../services/rapports.service';
import { SessionStorageService } from '../../../services/session-storage.service';
import { EmailMoreInfoDialogComponent } from './email-more-info-dialog/email-more-info-dialog.component';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {

  /** Dummy data for incident Types */
  incidentTypes: string[] = [
    'Aangerand',
    'LHBTI',
    'Agressie',
    'Uitgescholden',
    'Gediscrimineerd',
    'Anders',
  ];

  /** Icon for the `Stop` button. */
  iconQuit = faTimes;

  iconCalender = faCalendarAlt;

  /** The questions form */
  questionsForm = new FormGroup({
    dateTime: new FormControl(null, Validators.required),
    events: new FormControl([]),
    story: new FormControl(),
    name: new FormControl(),
    email: new FormControl(null, [ Validators.required, Validators.email]),
    victimSupport: new FormControl(true, Validators.required),
    extraInfo: new FormControl(true, Validators.required),
    condition: new FormControl(false, Validators.required)
  });

  constructor(
    private router: Router,
    private reportsService: RapportsService,
    private sessionStorageService: SessionStorageService,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {}

  /** Handles going back to the Home Page, thus stopping the process of filling in the form. */
  onStop(): void {
    this.router.navigate(['/home']);

    this.reportsService.isCreatingRapport = false;
  }

  /** Handles going the previous page. */
  onPrevious(): void {
    this.router.navigate(['/location-picker']);
  }

  /** Handles going to the next page. */
  onNext(): void {
    this.router.navigate(['/bevestiging-melding'])
  }

  onMIEmail(): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.hasBackdrop = true;
    dialogConfig.closeOnNavigation = true;
    dialogConfig.position = {
      top: '40%',
      left: '10%',
    };

    this.dialog.open(EmailMoreInfoDialogComponent, dialogConfig);
  }

  /** Provides an element class depending on a form value. */
  buttonClass(formValue: boolean): string {
    return !!formValue ? 'btn-success' : 'bg-grey2';
  }

  /** Toggles a form value between true <=> false. */
  toggleRadioValue(controlName: string, ignoreClickValue: boolean): void {
    const control = this.questionsForm.controls[controlName];

    if (control.value === ignoreClickValue) return;

    // Updates the form value.
    control.setValue(!control.value);
  }

  /** Adds or removes a Incident Type from the form value */
  toggleIncidentEvent(incident: string): void {
    const incidents: string[] = this.questionsForm.value.events;
    const indexOfIncident = incidents.indexOf(incident);

    if (indexOfIncident > -1) incidents.splice(indexOfIncident, 1);
    else incidents.push(incident);

    // Updates the form value.
    this.questionsForm.controls.events.setValue(incidents);
  }
}
