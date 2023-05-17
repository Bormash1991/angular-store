import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, throwError } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';
import { UsersService } from '../shared/services/users.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {
  sub: Subscription;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private usersService: UsersService,
    private snackBar: MatSnackBar
  ) {}

  form: FormGroup = this.fb.group({
    username: ['', Validators.required],
    phoneNumber: [
      '',
      [Validators.required, Validators.pattern(/^\+380\d{9}$/)],
    ],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });
  cancel() {
    this.router.navigateByUrl('');
  }

  ngOnInit(): void {}
  redirect() {
    const { username, phoneNumber, email, password } = this.form.getRawValue();
    if (this.form.valid) {
      this.authService
        .registration(email, password)
        .then((req) => {
          this.usersService
            .setUserInf(req.user?.uid!, phoneNumber, username, email)
            .then(() => {
              this.router.navigateByUrl('');
            });
        })
        .catch(() => {
          this.snackBar.open('Користувач з таким email вже існує', 'Закрити', {
            duration: 10000,
          });
          this.form.reset();
        });
    }
  }
}
