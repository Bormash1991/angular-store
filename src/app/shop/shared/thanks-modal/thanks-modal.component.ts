import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-thanks-modal',
  templateUrl: './thanks-modal.component.html',
  styleUrls: ['./thanks-modal.component.scss'],
})
export class ThanksModalComponent {
  constructor(public dialogRef: MatDialogRef<ThanksModalComponent>) {}
  sendOrder() {
    this.dialogRef.close();
  }
}
