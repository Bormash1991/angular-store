import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private db: AngularFireDatabase) {}
  getCategories() {
    return this.db
      .list<{ name: string; eng: string }>(`categories`)
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((c) => {
            return {
              ...c.payload.val(),
              id: c.payload.key as string,
            };
          })
        )
      );
  }
}
