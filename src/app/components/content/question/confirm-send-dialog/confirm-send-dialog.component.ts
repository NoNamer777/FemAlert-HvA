import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-confirm-send-dialog',
  templateUrl: './confirm-send-dialog.component.html',
  styleUrls: ['./confirm-send-dialog.component.scss']
})
export class ConfirmSendDialogComponent implements OnInit {

  closeDialogIcon = faTimes;

  constructor(private dialogRef: MatDialogRef<ConfirmSendDialogComponent>) {}

  ngOnInit(): void {}

  onDialogClose(accepted: boolean): void {
    this.dialogRef.close(accepted);
  }
}
