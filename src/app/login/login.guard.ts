import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}
  canActivate() {
    if (!!this.authService.getAuthToken()) {
      this.router.navigateByUrl('admin-panel');
      return false;
    } else {
      return true;
    }
  }
}
