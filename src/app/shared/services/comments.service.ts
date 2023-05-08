import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { map } from 'rxjs';
import { Comments } from 'src/app/models/TypeOfProduct.inteface';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  constructor(private db: AngularFireDatabase) {}
  getComments(id: string) {
    return this.db
      .list<Comments>(`comments${id}`)
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((c) => ({
            key: c.payload.key as string,
            ...(c.payload.val() as Comments),
          }))
        )
      );
  }
}
