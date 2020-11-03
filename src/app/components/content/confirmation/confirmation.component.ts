import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})


export class ConfirmationComponent implements OnInit {
 iconQuit = faTimes;
  constructor(private router: Router) {}

  ngOnInit(): void {}

  onStop(): void {
      this.router.navigate(['/home']);
  }

}
