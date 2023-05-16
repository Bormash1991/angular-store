import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  private sub: Subscription;
  protected textError: string = '';

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
    // this.sub = this.form.valueChanges.subscribe((value) => {
    //   if (value.password || value.email) {
    //     this.textError = '';
    //     this.errorMessages = {};
    //   }
    // });
  }
  redirect() {
    let { email, password } = this.form.getRawValue();
    this.authService.login(email, password).then(() => {
      this.router.navigateByUrl('');
    });
  }
  ngOnDestroy() {

  }
}
