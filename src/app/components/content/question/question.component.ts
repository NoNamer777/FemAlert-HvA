import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { faCalendarAlt, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { RapportsService } from '../../../services/rapports.service';
import { EventsService, MOCK_EVENTS } from '../../../services/events.service';
import { SessionStorageService } from '../../../services/session-storage.service';
import { Event } from '../../../models/Event';

import { EmailMoreInfoDialogComponent } from './email-more-info-dialog/email-more-info-dialog.component';
import { ConfirmSendDialogComponent } from './confirm-send-dialog/confirm-send-dialog.component';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit, OnDestroy {

  /** Dummy data for incident Types */
  private _incidentTypes: Event[] = [];

  /** Icon for the `Stop` button. */
  iconQuit = faTimes;

  /** Icon for the date time input */
  iconCalender = faCalendarAlt;

  /**
   * Keeps track when all the necessary data has been retrieved from the back-end server
   * before creating the rest of a Rapport.
   */
  dataReady = false;

  /** The questions form */
  questionsForm = new FormGroup({
    dateTime: new FormControl(null, Validators.required),
    events: new FormControl([]),
    story: new FormControl(),
    name: new FormControl(),
    email: new FormControl(null, [ Validators.required, Validators.email]),
    victimSupport: new FormControl(true, Validators.required),
    extraInfo: new FormControl(true, Validators.required),
    acceptedTerms: new FormControl(false, Validators.required)
  });

  /** Subject that notifies when this component is destroyed. */
  dialogClosed$ = new Subject<void>();

  constructor(
    private router: Router,
    private rapportsService: RapportsService,
    private sessionStorageService: SessionStorageService,
    private eventsService: EventsService,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    // Get the incident types from the back-end server.
    this.eventsService.getEvents().subscribe(
      events => this.incidentTypes = events,
      () => this.incidentTypes = MOCK_EVENTS
    );
  }

  ngOnDestroy(): void {
    this.dialogClosed$.next();
    this.dialogClosed$.complete();
  }

  /** Handles going back to the Home Page, thus stopping the process of filling in the form. */
  onStop(): void {
    this.router.navigate(['/home']);

    this.rapportsService.isCreatingRapport = false;
  }

  /** Handles going the previous page. */
  onPrevious(): void {
    this.router.navigate(['/rapporteren/locatie']);
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

  /** Handles going to the next page. */
  onSendRapport(): void {
    // Open the confirmation dialog.
    const dialogReference = this.dialog.open(ConfirmSendDialogComponent, {
      hasBackdrop: true,
      disableClose: true,
      autoFocus: false,
      closeOnNavigation: true,
      panelClass: 'rounded-corner',
      width: '90vw',
      maxWidth: '',
      position: {
        bottom: '8%',
      },
    });

    // Listen to when the dialog has closed.
    dialogReference.afterClosed().pipe(takeUntil(this.dialogClosed$)).subscribe(accepted => {
      this.dialogClosed$.next();

      // Don't send a rapport when the User has not confirmed it.
      if (!accepted) return;

      this.setRapportData();
      // Request the rapport to be send to the back-end server to be stored in the database.
      this.rapportsService.sendRapport(this.sessionStorageService.serialize(this.rapportsService.rapport)).subscribe(
        () => this.router.navigate(['/bevestiging-melding']),
        () => this.router.navigate(['/bevestiging-melding'])
      );
    });
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
  toggleIncidentEvent(incident: Event): void {
    const incidents: Event[] = this.questionsForm.value.events;
    const indexOfIncident = incidents.indexOf(incident);

    if (indexOfIncident > -1) incidents.splice(indexOfIncident, 1);
    else incidents.push(incident);

    // Updates the form value.
    this.questionsForm.controls.events.setValue(incidents);
  }

  /** Gets the values from the form and pass it through to the rapport object. */
  setRapportData(): void {
    this.rapportsService.rapport.wantsExtraInfo = this.questionsForm.value.extraInfo;
    this.rapportsService.rapport.requiresSupport = this.questionsForm.value.victimSupport;
    this.rapportsService.rapport.dateTime = this.questionsForm.value.dateTime;
    this.rapportsService.rapport.emailAddress = this.questionsForm.value.email;
    this.rapportsService.rapport.story = this.questionsForm.value.story;
    this.rapportsService.rapport.name = this.questionsForm.value.name;

    for (const event of this.questionsForm.value.events) this.rapportsService.rapport.addEvent(event);
  }

  get incidentTypes(): Event[] {
    return this._incidentTypes;
  }

  set incidentTypes(events: Event[]) {
    this._incidentTypes = events;

    // Acknowledge that the data is ready.
    this.dataReady = true;
  }
}
