import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { BACK_END_URL } from '../../../services/questions.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  iconQuit = faTimes;

  waitingForResponse = false;

  /** The contact form */
  contactForm = new FormGroup({
    name: new FormControl(null, Validators.required),
    subject: new FormControl(null, Validators.required),
    email: new FormControl(null, [Validators.required, Validators.email]),
    question: new FormControl(null, Validators.required),
  });

  constructor(
    private router: Router,
    private httpClient: HttpClient,
  ) {}

  ngOnInit(): void {}

  /** Handles going back to the Home Page. */
  onStop(): void {
    this.router.navigate(['/home']);
  }


  /** Handles requesting the contact form to be send to the back-end server. */
  onSubmitMessage(): void {
    this.waitingForResponse = true;

    this.httpClient.post(`${BACK_END_URL}/contact/request-contact`, this.contactForm.value).subscribe(
      () => this.router.navigate(['/contact-bevestiging']),
      error => {
        alert("Er is iets fout gegaan tijdens het sturen van uw bericht. In de logs kunt u meer info vinden.");

        console.error(error);
        this.waitingForResponse = false;
    });
  }
}
