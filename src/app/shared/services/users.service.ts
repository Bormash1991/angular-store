import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { User } from 'src/app/models/decodedUser.interface';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(
    private db: AngularFireDatabase,
    private fireAuth: AngularFireAuth
  ) {}
  getUsersFromDb() {
    return this.db.list<User>(`users`).valueChanges();
  }
  getUser() {
    return this.fireAuth.authState;
  }
  setUserInf(uid: string, number: string, name: string, email: string) {
    return this.db.object(`users/${uid}`).set({
      name: name,
      number: number,
      email: email,
      date: '---',
      gender: '---',
    });
  }
  updateUser(data: User, uid: string) {
    return this.db.object(`users/${uid}`).update(data);
  }
  getUserInf(uid: string) {
    return this.db.object<User>(`users/${uid}`).valueChanges();
  }
}
