import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalStorageService } from './localstorage.service';
import jwt_decode from 'jwt-decode';
import { decodedUser } from 'src/app/models/decodedUser.interface';
import { unauthorizedUser } from 'src/app/models/unauthorizedUser.interface';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private fireAuth: AngularFireAuth, private router: Router) {}

  login(email: string, password: string) {
    return this.fireAuth.signInWithEmailAndPassword(email, password);
  }
  registration(email: string, password: string) {
    return this.fireAuth.createUserWithEmailAndPassword(email, password);
  }
  logOut() {
    this.fireAuth.signOut().then(() => {
      this.router.navigate(['/login']);
    });
  }
  resetPassword(email: string) {
    return this.fireAuth.sendPasswordResetEmail(email);
  }
}
