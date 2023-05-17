import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { map } from 'rxjs';
import { TypeOfOrder } from 'src/app/models/TypeOfOrder.interface';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  constructor(private db: AngularFireDatabase) {}
  getOrdersFromDb() {
    return this.db
      .list<TypeOfOrder>(`orders`)
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((c) => {
            return {
              id: c.payload.key as string,
              ...c.payload.val(),
            } as TypeOfOrder;
          })
        )
      );
  }
  getOrdersByUserId(userId: string) {
    return this.db
      .list<TypeOfOrder>(`orders`, (ref) =>
        ref.orderByChild('userId').equalTo(userId)
      )
      .valueChanges();
  }
  setOrder(value: TypeOfOrder) {
    return this.db.list(`orders`).push(value);
  }
  updateOrder(value: TypeOfOrder, id: string) {
    this.db.object(`orders/${id}`).update(value);
  }
  deleteOrder(id: string) {
    this.db.object(`orders/${id}`).remove();
  }
}
