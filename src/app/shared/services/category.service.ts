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
      .list<{ id?: string; name: string; link: string }>(`categories`)
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((c) => {
            return {
              ...(c.payload.val() as { name: string; link: string }),
              id: c.payload.key as string,
            };
          })
        )
      );
  }
  getCategoryName(link: string) {
    return this.db
      .list<{ name: string; eng: string }>('categories', (ref) =>
        ref.orderByChild('link').equalTo(link)
      )
      .valueChanges();
  }
}
