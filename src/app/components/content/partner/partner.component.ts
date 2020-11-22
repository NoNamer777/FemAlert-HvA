import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/User';
import { HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-partner',
  templateUrl: './partner.component.html',
  styleUrls: ['./partner.component.scss']
})

export class PartnerComponent implements OnInit {
  /** Boolean for showing text */
  showInvalidCredentials: boolean;

  /** Login Icons */
  iconEmail = faEnvelope;
  iconPassword = faLock;

  /** Login Form */
  loginForm = new FormGroup({
    email: new FormControl(null, [Validators.email, Validators.required]),
    password: new FormControl(null, [Validators.required]),
  });

  constructor(private userService: UserService,
              private router: Router) { }

  ngOnInit(): void {
    this.showInvalidCredentials = false;
  }

  /**
   * On submitting form check if form is valid and send request to login
   */
  onSubmit(): void{
    // Check if form is valid if not show invalid credentials text
    if (this.loginForm.invalid === true) {
      this.showInvalidCredentials = true;
      return;
    }

    // Create user with email and password
    const user = new User(this.loginForm.controls.email.value, this.loginForm.controls.password.value);

    /**
     * Request login to backend
     * If login is successful navigate to Dashboard component
     * If login is unsuccessful show invalid credentials text
     */
    this.userService.login(user).subscribe(
      (response: HttpResponse<User>) => {
        this.router.navigate(['/partner/dashboard']);
      }, error => this.showInvalidCredentials = true
    );
  }
}
