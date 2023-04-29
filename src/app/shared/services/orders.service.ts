import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  constructor(private db: AngularFireDatabase) {}
  getOrdersFromDb() {
    return this.db.list(`orders`).valueChanges();
  }
  getOrdersByUserId(userId: number) {
    return this.db
      .list(`orders`, (ref) => ref.orderByChild('userId').equalTo(userId))
      .valueChanges();
  }
  getOrdersById(id: number) {
    return this.db
      .list(`orders`, (ref) => ref.orderByChild('id').equalTo(id))
      .valueChanges();
  }
  getOrderById(id: number) {
    return this.db
      .list(`orders`, (ref) =>
        ref.orderByChild('id').equalTo(id).limitToFirst(1)
      )
      .valueChanges();
  }
  setOrder(value: any) {}
  updateOrder(value: any) {}
}
