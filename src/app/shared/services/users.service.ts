import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(
    private db: AngularFireDatabase,
    private fireAuth: AngularFireAuth
  ) {}
  getUsersFromDb() {
    return this.db.list(`users`).valueChanges();
  }
  getUser() {
    return this.fireAuth.authState;
  }
  updateUsers(value: any) {}
}
