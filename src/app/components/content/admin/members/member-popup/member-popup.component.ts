import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from '../../../../../models/User';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../../../services/user.service';

@Component({
  selector: 'app-member-popup',
  templateUrl: './member-popup.component.html',
  styleUrls: ['./member-popup.component.scss']
})
export class MemberPopupComponent implements OnInit {

  /** Error message booleans */
  emailIsInvalid = false;
  companyNameIsInvalid = false;
  gotNetworkError = false;

  /** Member form */
  memberForm = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    companyName: new FormControl(null, [Validators.required]),
    admin: new FormControl(false)
  });

  constructor(@Inject(MAT_DIALOG_DATA) public data: User,
              private userService: UserService,
              private dialogRef: MatDialogRef<MemberPopupComponent>) { }

  /**
   * Set value of chosen User on initialize
   */
  ngOnInit(): void {
    this.memberForm.controls.email.setValue(this.data.emailAddress);
    this.memberForm.controls.companyName.setValue(this.data.name);
    this.memberForm.controls.admin.setValue(this.data.admin);
  }

  /** Toggles a form value between true <=> false. */
  toggleCheckboxValue(value: boolean): void {
    const control = this.memberForm.controls.admin;

    if (control.value === value) return;

    // Updates the form value.
    control.setValue(!control.value);
  }

  /** Provides an element class depending on a form value. */
  buttonClass(formValue: boolean): string {
    return !!formValue ? 'btn-success' : 'bg-darkgrey';
  }

  /**
   * On submitting form check if user is valid if so send backend request to edit user
   */
  onSubmit(): void {
    // Check if user is valid
    this.emailIsInvalid = this.memberForm.controls.email.invalid;
    this.companyNameIsInvalid = this.memberForm.controls.companyName.invalid;

    if (this.memberForm.invalid) return;

    // Create new user to give updated information to
    const updatedUser: User = new User();
    updatedUser.id = this.data.id;
    updatedUser.emailAddress = this.memberForm.controls.email.value;
    updatedUser.name = this.memberForm.controls.companyName.value;
    updatedUser.admin = this.memberForm.controls.admin.value;

    // Send backend request with updated User information
    this.userService.updateUser(updatedUser).subscribe(
      () => this.dialogRef.close(),
      () => this.gotNetworkError = true
    );
  }

}
