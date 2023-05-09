import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, throwError } from 'rxjs';
import { ErrorsObject } from '../models/errorMessages.interface';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';
import { UsersService } from '../shared/services/users.service';

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
    private router: Router,
    private usersService: UsersService
  ) {}

  form: FormGroup = this.fb.group({
    username: '',
    phoneNumber: '',
    email: '',
    password: '',
  });
  cancel() {
    this.router.navigateByUrl('');
  }

  ngOnInit(): void {
    // this.sub = this.form.valueChanges.subscribe((value) => {
    //   if (value.password || value.username || value.email) {
    //     for (let i in value) {
    //       if (value[i].length) {
    //         this.errorMessages[i] = '';
    //       }
    //     }
    //   }
    // });
  }
  redirect() {
    const { username, phoneNumber, email, password } = this.form.getRawValue();
    this.authService.registration(email, password).then((req) => {
      this.usersService
        .setUserInf(req.user?.uid!, phoneNumber, username, email)
        .then(() => {
          this.router.navigateByUrl('');
        });
    });
  }
  ngOnDestroy() {}
}
