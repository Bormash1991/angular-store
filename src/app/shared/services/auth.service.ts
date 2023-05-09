import { Injectable } from '@angular/core';
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
      this.router.navigate(['']);
    });
  }
  resetPassword(email: string) {
    return this.fireAuth.sendPasswordResetEmail(email);
  }
}
