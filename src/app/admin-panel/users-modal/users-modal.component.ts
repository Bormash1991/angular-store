import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-users-modal',
  templateUrl: './users-modal.component.html',
  styleUrls: ['./users-modal.component.scss'],
})
export class UsersModalComponent {
  public keys: string[] = Object.keys(this.data);
  public className: string;
  public titleText: string;
  constructor(
    public dialogRef: MatDialogRef<UsersModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {}
  form: FormGroup = this.fb.group({
    ...this.data,
  });

  closeDialog() {
    this.dialogRef.close();
  }
  ngOnInit() {
    if (this.keys.length == 1) {
      this.titleText = 'Add User';
    } else {
      this.titleText = 'Edit User';
    }
  }
  showData() {
    console.log(this.form.getRawValue());
    this.dialogRef.close();
  }
}
