import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, throwError } from 'rxjs';
import { ErrorsObject } from '../models/errorMessages.interface';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit, OnDestroy {
  sub: Subscription;

  errorMessages: ErrorsObject = {};

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  form: FormGroup = this.fb.group({
    username: '',
    email: '',
    password: '',
  });
  cancel() {
    this.router.navigateByUrl('');
    this.errorMessages = {};
  }

  ngOnInit(): void {
    this.sub = this.form.valueChanges.subscribe((value) => {
      if (value.password || value.username || value.email) {
        for (let i in value) {
          if (value[i].length) {
            this.errorMessages[i] = '';
          }
        }
      }
    });
  }
  redirect() {
    // this.authService
    //   .registration<{ token: string }>(this.form.getRawValue())
    //   .subscribe({
    //     next: (response) => {
    //       this.authService.setAuthToken(response.token);
    //       this.router.navigateByUrl('');
    //       this.errorMessages = {};
    //     },
    //     error: (error) => {
    //       if (error.status === 401) {
    //         this.form.patchValue({ email: '', password: '' });
    //       } else if (error.status === 400) {
    //         error.error.forEach((error: string) => {
    //           const name = error.split(' - ')[0],
    //             text = error.split(' - ')[1];
    //           this.errorMessages[name] = text;
    //         });
    //       } else {
    //         throwError(() => error);
    //       }
    //     },
    //   });
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
