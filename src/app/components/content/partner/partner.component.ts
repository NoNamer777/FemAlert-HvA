import { Component, InjectionToken, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { MatPrefix } from '@angular/material/form-field';

@Component({
  selector: 'app-partner',
  templateUrl: './partner.component.html',
  styleUrls: ['./partner.component.scss']
})

export class PartnerComponent implements OnInit {
  /** The partners form */
  partnersform = new FormGroup({
    email : new FormControl(null, [ Validators.required]),
    password: new FormControl(null, [ Validators.required])
  });

  /** Partner Icons */
  iconEmail = faEnvelope;
  iconPassword = faLock;
  MAT_PREFIX: InjectionToken<MatPrefix>;

  constructor() { }

  ngOnInit(): void {
  }


}
