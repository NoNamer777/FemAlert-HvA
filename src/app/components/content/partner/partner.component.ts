import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { faLock } from '@fortawesome/free-solid-svg-icons';

import { UserService } from '../../../services/user.service';
import { User } from '../../../models/User';
import { AuthenticateService } from '../../../services/authenticate.service';

@Component({
  selector: 'app-partner',
  templateUrl: './partner.component.html',
  styleUrls: ['./partner.component.scss']
})

export class PartnerComponent implements OnInit {
  showInvalidCredentials = false;

  /** Login Icons */
  iconEmail = faEnvelope;
  iconPassword = faLock;

  /** Login Form */
  loginForm = new FormGroup({
    email: new FormControl(null, [Validators.email, Validators.required]),
    password: new FormControl(null, [Validators.required]),
  });

  constructor(private authenticateService: AuthenticateService) { }

  ngOnInit(): void {}

  onSubmit(): void{
    if (this.loginForm.invalid === true) {
      this.showInvalidCredentials = true;
      return;
    }

    const user = new User();

    user.emailAddress = this.loginForm.controls.email.value;
    user.password = this.loginForm.controls.password.value;

    this.authenticateService.login(user).subscribe((loggedInUser: User) => {
        // if good
        this.showInvalidCredentials = false;

        alert(`Welcome back ${loggedInUser.name}`);
      }, error => this.showInvalidCredentials = true
    );
  }
}
