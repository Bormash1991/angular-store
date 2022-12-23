import { Injectable } from '@angular/core';
import { TypeOfProduct } from './models/TypeOfProduct.inteface';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor() {}
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
    return mass;
  }
}
