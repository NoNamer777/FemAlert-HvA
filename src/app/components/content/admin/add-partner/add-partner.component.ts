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

  /** Form for adding a new User */
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

  /**
   * Registers new User and sends register request to backend
   */
  onSubmit(): void {
    // Check if form controls are valid
    this.emailIsInvalid = this.addMemberForm.controls.email.invalid;
    this.passwordIsInvalid = this.addMemberForm.controls.password.invalid;
    this.confirmPasswordIsInvalid = this.addMemberForm.controls.confirmPassword.invalid ||
      this.addMemberForm.controls.password.value !== this.addMemberForm.controls.confirmPassword.value;
    this.companyNameIsInvalid = this.addMemberForm.controls.companyName.invalid;

    if (this.addMemberForm.invalid) {
      return;
    }

    // Create new user and add information from form
    const newUser = new User();
    newUser.emailAddress = this.addMemberForm.controls.email.value;
    newUser.password = this.addMemberForm.controls.password.value;
    newUser.name = this.addMemberForm.controls.companyName.value;
    newUser.admin = this.addMemberForm.controls.admin.value;

    // Backend request for registering with new User attached
    this.authenticateService.register(newUser).subscribe(
      response => {
        this.addMemberForm.reset();
        this.addMemberForm.controls.admin.setValue(false);
      },
      error => this.gotNetworkError = true
    );
  }

}
