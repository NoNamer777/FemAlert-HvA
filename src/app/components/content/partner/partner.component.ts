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
  showInvalidCredentials = false;

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

  ngOnInit(): void {}

  onSubmit(): void{
    if (this.loginForm.invalid === true) {
      this.showInvalidCredentials = true;
      return;
    }

    const user = new User(this.loginForm.controls.email.value, this.loginForm.controls.password.value);

    this.userService.login(user).subscribe(
      (response: HttpResponse<User>) => {
        // if good
        this.showInvalidCredentials = false;
        this.router.navigate(['/partner/dashboard']);
      }, error => this.showInvalidCredentials = true
    );
  }
}
