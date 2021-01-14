import { Component, OnInit } from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact-confirmation',
  templateUrl: './contact-confirmation.component.html',
  styleUrls: ['./contact-confirmation.component.scss']
})
export class ContactConfirmationComponent implements OnInit {

  iconQuit = faTimes;

  constructor(private router: Router) { }

  ngOnInit(): void {}

  onStop(): void {
    this.router.navigate(['/home']);
  }

}
