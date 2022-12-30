import { Injectable } from '@angular/core';
import { TypeOfProduct } from '../models/TypeOfProduct.inteface';
import { data } from '../data/data';
import { Observable, delay, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  data: TypeOfProduct[];
  constructor() {
    this.data = data || this.createRandomeDate(8);
  }

  createRandomeDate(n: number = 1): TypeOfProduct[] {
    let str: string, price: number;
    let mass: TypeOfProduct[] = [];
    for (let i = 0; i < n; i++) {
      str = Math.random().toString(36).substring(2);
      price = Math.random() * 3000 - 1000 + 1000;
      mass.push({
        id: i + 1,
        name: str,
        price: Math.floor(price),
        counter: 0,
      });
    }
    this.data = mass;
    return mass;
  }

  getDate(): Observable<TypeOfProduct[]> {
    return of(this.data).pipe(delay(1000));
  }
}
