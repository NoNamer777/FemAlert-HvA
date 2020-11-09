import { Component, OnInit } from '@angular/core';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../../../models/User';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  /** Login Icons */
  iconEmail = faEnvelope;
  iconPassword = faLock;

  user: User;

  /** Login Form */
  loginForm = new FormGroup({
    email: new FormControl(null, [Validators.email, Validators.required]),
    password: new FormControl(null, Validators.required)
  });

  constructor(private userService: UserService) { }

  ngOnInit(): void {}

  onSubmit(): void{
    this.user = new User(this.loginForm.controls.email.value, this.loginForm.controls.password.value);

    console.log(this.user);

    this.userService.login(this.user).subscribe(
      result => console.log(result),
      error => console.log(error)
    );
  }

}
