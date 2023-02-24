import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';
import { Subscription, throwError } from 'rxjs';
import { ErrorsObject } from '../models/errorMessages.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  sub: Subscription;
  textError: string = '';
  errorMessages: ErrorsObject = {};

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  form: FormGroup = this.fb.group({
    email: '',
    password: '',
  });
  cancel() {
    this.router.navigateByUrl('');
    this.textError = '';
  }

  ngOnInit(): void {
    this.sub = this.form.valueChanges.subscribe((value) => {
      if (value.password || value.email) {
        this.textError = '';
      }
    });
  }
  redirect() {
    this.authService
      .logIn<{ token: string }>(this.form.getRawValue())
      .subscribe({
        next: (response) => {
          this.authService.setAuthToken(response.token);
          this.router.navigateByUrl('admin-panel');
          this.textError = '';
        },
        error: (error) => {
          if (error.status === 401) {
            this.form.patchValue({ email: '', password: '' });
            this.textError = error.error.message;
          } else if (error.status === 400) {
            error.error.forEach((error: string) => {
              const name = error.split(' - ')[0],
                text = error.split(' - ')[1];
              this.errorMessages[name] = text;
            });
          } else {
            throwError(() => error);
          }
        },
      });
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
