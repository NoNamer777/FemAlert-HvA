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
  gotNetworkError = false;

  // todo: add [ based: new FormControl(null, [Validators.required]) ]
  addMemberForm = new FormGroup({
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
    const control = this.addMemberForm.controls.admin;

    if (control.value === value) return;

    // Updates the form value.
    control.setValue(!control.value);
  }

  /** Provides an element class depending on a form value. */
  buttonClass(formValue: boolean): string {
    return !!formValue ? 'btn-success' : 'bg-darkgrey';
  }

  onSubmit(): void {
    this.emailIsInvalid = this.addMemberForm.controls.email.invalid;
    this.passwordIsInvalid = this.addMemberForm.controls.password.invalid;
    this.confirmPasswordIsInvalid = this.addMemberForm.controls.confirmPassword.invalid ||
      this.addMemberForm.controls.password.value !== this.addMemberForm.controls.confirmPassword.value;
    this.companyNameIsInvalid = this.addMemberForm.controls.companyName.invalid;

    if (this.addMemberForm.invalid) {
      return;
    }

    const newUser = new User();
    newUser.emailAddress = this.addMemberForm.controls.email.value;
    newUser.password = this.addMemberForm.controls.password.value;
    newUser.name = this.addMemberForm.controls.companyName.value;
    newUser.admin = this.addMemberForm.controls.admin.value;

    this.authenticateService.register(newUser).subscribe(
      response => {
        alert(`Lid ${response.id} is succesvol geregistreerd`);
        this.addMemberForm.reset();
        this.addMemberForm.controls.admin.setValue(false);
      },
      error => this.gotNetworkError = true
    );
  }

}
