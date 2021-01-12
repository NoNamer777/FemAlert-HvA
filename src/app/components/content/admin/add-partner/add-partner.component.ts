import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticateService } from '../../../../services/authenticate.service';
import { User } from '../../../../models/User';

@Component({
  selector: 'app-add-partner',
  templateUrl: './add-partner.component.html',
  styleUrls: ['./add-partner.component.scss']
})
export class AddPartnerComponent implements OnInit {

  /** Invalid form values bools */
  emailIsInvalid = false;
  passwordIsInvalid = false;
  confirmPasswordIsInvalid = false;
  companyNameIsInvalid = false;

  // todo: add [ based: new FormControl(null, [Validators.required]) ]
  addMemberFrom = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
    confirmPassword: new FormControl(null, [Validators.required]),
    companyName: new FormControl(null, [Validators.required]),
    admin: new FormControl(false),
  });

  constructor(private authenticateService: AuthenticateService) { }

  ngOnInit(): void {
  }

  /** Toggles a form value between true <=> false. */
  toggleCheckboxValue(value: boolean): void {
    const control = this.addMemberFrom.controls.admin;

    if (control.value === value) return;

    // Updates the form value.
    control.setValue(!control.value);
  }

  /** Provides an element class depending on a form value. */
  buttonClass(formValue: boolean): string {
    return !!formValue ? 'btn-success' : 'bg-darkgrey';
  }

  onSubmit(): void {
    this.emailIsInvalid = this.addMemberFrom.controls.email.invalid;
    this.passwordIsInvalid = this.addMemberFrom.controls.password.invalid;
    this.confirmPasswordIsInvalid = this.addMemberFrom.controls.confirmPassword.invalid ||
      this.addMemberFrom.controls.password.value !== this.addMemberFrom.controls.confirmPassword.value;
    this.companyNameIsInvalid = this.addMemberFrom.controls.companyName.invalid;

    if (this.addMemberFrom.invalid) {
      return;
    }

    const newUser = new User();
    newUser.emailAddress = this.addMemberFrom.controls.email.value;
    newUser.password = this.addMemberFrom.controls.password.value;
    newUser.name = this.addMemberFrom.controls.companyName.value;
    newUser.admin = this.addMemberFrom.controls.admin.value;

    this.authenticateService.register(newUser).subscribe(
      response => {
        console.log(response);
        alert(`User ${response.id} successfully registered`);
        this.addMemberFrom.reset();
      },
      error => console.log(error)
    );
  }

}
