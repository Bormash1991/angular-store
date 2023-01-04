import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(
    public dialogRef: MatDialogRef<LoginComponent>,
    private fb: FormBuilder,
    private authService: AuthService
  ) {}
  form: FormGroup = this.fb.group({
    username: '',
    password: '',
  });

  closeDialog() {
    this.dialogRef.close();
  }

  showData() {
    this.authService
      .logIn<{ access_token: string }>(this.form.getRawValue())
      .subscribe((response) => {
        this.authService.setAuthToken(response.access_token);
      });
    this.dialogRef.close();
  }
}
