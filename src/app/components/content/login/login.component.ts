import { Component, OnInit } from '@angular/core';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../../../models/User';
import { UserService } from '../../../services/user.service';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  showInvalidCredentials = false;

  /** Login Icons */
  iconEmail = faEnvelope;
  iconPassword = faLock;

  /** Login Form */
  loginForm = new FormGroup({
    email: new FormControl(null, [Validators.email, Validators.required]),
    password: new FormControl(null, Validators.required)
  });

  constructor(private userService: UserService) { }

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
      }, error => this.showInvalidCredentials = true
    );
  }

}
