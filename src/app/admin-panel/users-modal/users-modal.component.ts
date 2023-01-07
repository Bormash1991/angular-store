import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UsersService } from 'src/app/shared/services/users.service';
@Component({
  selector: 'app-users-modal',
  templateUrl: './users-modal.component.html',
  styleUrls: ['./users-modal.component.scss'],
})
export class UsersModalComponent {
  public keys: string[] = Object.keys(this.data.data);
  public className: string;
  public titleText: string;
  constructor(
    public dialogRef: MatDialogRef<UsersModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private usersService: UsersService
  ) {}
  form: FormGroup = this.fb.group({
    ...this.data.data,
  });

  closeDialog() {
    this.dialogRef.close();
  }
  ngOnInit() {
    if (!this.data.id) {
      this.titleText = 'Add User';
    } else {
      this.titleText = 'Edit User';
    }
  }
  showData() {
    if (this.titleText == 'Add User') {
      this.usersService
        .create({
          ...this.form.getRawValue(),
        })
        .subscribe({
          next: (response) => {
            window.location.reload();
          },
          error: (error) => {},
        });
    } else {
      this.usersService
        .update(this.data.id, { ...this.form.getRawValue() })
        .subscribe({
          next: (response) => {
          window.location.reload();},
          error: (error) => {},
        });
    }
    console.log(this.form.getRawValue());
    this.dialogRef.close();
  }
}
