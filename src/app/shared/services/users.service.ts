import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { map, switchMap, take } from 'rxjs';
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
  checkAdmin() {
    let uid = '';
    return this.getUser()
      .pipe(
        switchMap((user) => {
          if (user) {
            uid = user.uid;
          } else {
            uid = '';
          }
          return this.db.list<string>('admins').valueChanges();
        })
      )
      .pipe(
        map((admins) => {
          let check = false;
          if (!uid) {
            return check;
          }
          admins.forEach((admin) => {
            if (admin == uid) check = true;
          });
          return check;
        })
      );
  }
}
