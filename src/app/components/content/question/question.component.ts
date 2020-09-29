import { Component, OnInit } from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {

  iconQuit = faTimes;

  questionsForm = new FormGroup({
    date: new FormControl(),
    time: new FormControl(),
    events: new FormControl(),
    story: new FormControl(),
    name: new FormControl(),
    email: new FormControl(null, [ Validators.required, Validators.email]),
    victimSupport: new FormControl(true, Validators.required),
    extraInfo: new FormControl(true, Validators.required),
    condition: new FormControl()
  });

  constructor(private router: Router) {}

  ngOnInit(): void {}

  onStop(): void {
    this.router.navigate(['/home']);
  }

  onPrevious(): void {
    this.onStop();
  }

  onNext(): void {
    console.log('going to next screen');
  }

  buttonClass(formValue: boolean): string {
    return !!formValue ? 'btn-success' : 'bg-grey2';
  }

  toggleRadioValue(controlName: string, ignoreClickValue: boolean): void {
    const control = this.questionsForm.controls[controlName];

    if (control.value === ignoreClickValue) return;

    control.setValue(!control.value);
  }

}
