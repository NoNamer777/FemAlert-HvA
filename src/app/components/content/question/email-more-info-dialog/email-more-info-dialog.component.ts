import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-email-more-info-dialog',
  templateUrl: './email-more-info-dialog.component.html',
  styleUrls: ['./email-more-info-dialog.component.scss']
})
export class EmailMoreInfoDialogComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<EmailMoreInfoDialogComponent>) {}

  ngOnInit(): void {}

}
