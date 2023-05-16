import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import jwt_decode from 'jwt-decode';
import { Observable, map, take } from 'rxjs';
import { UsersService } from '../services/users.service';
@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
    private router: Router
  ) {}
  canActivate(): Observable<boolean> {
    return this.usersService.getUser().pipe(
      map((user) => {
        if (user) {
          this.router.navigateByUrl('/');
          return false;
        } else {
          return true;
        }
      })
    );
  }
}
