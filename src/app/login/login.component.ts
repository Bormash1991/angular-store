import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';
import { Subscription, throwError } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  sub: Subscription;
  showLabel = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  form: FormGroup = this.fb.group({
    username: '',
    password: '',
  });
  cancel() {
    this.router.navigateByUrl('');
    this.showLabel = false;
  }

  ngOnInit(): void {
    this.sub = this.form.valueChanges.subscribe((value) => {
      if (value.password || value.username) {
        this.showLabel = false;
      }
    });
  }
  redirect() {
    this.authService
      .logIn<{ access_token: string }>(this.form.getRawValue())
      .subscribe({
        next: (response) => {
          this.authService.setAuthToken(response.access_token);
          this.router.navigateByUrl('admin-panel');
          this.showLabel = false;
        },
        error: (error) => {
          if (error.error.statusCode === 401) {
            this.form.patchValue({ username: '', password: '' });
            this.showLabel = true;
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
