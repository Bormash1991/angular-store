import { Injectable } from '@angular/core';
import { TypeOfProduct } from './models/TypeOfProduct.inteface';
import { data } from './data/data';
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
      });
    }
    this.data = mass;
    return mass;
  }

  getDate(): TypeOfProduct[] {
    return this.data;
  }
  getDateForWelcome(): TypeOfProduct[] {
    return this.data.slice(0, 3);
  }
}
