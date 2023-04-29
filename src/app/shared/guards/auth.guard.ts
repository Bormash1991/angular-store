import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import jwt_decode from 'jwt-decode';
import { decodedUser } from 'src/app/models/decodedUser.interface';
import { map, take } from 'rxjs';
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
  canActivate() {
    return true;
  }
}
