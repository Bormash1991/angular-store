import { TypeOfProduct } from 'src/app/models/TypeOfProduct.inteface';
import { Injectable } from '@angular/core';
import { LocalStorageService } from './localstorage.service';
import { BehaviorSubject, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AddCartItemService {
  data: TypeOfProduct[] =
    this.localStorageService.getData<TypeOfProduct[]>('CartDataCount') || [];
  productsSubj$ = new BehaviorSubject<TypeOfProduct[]>(this.data);

  constructor(private localStorageService: LocalStorageService) {}

  setData(elem: TypeOfProduct) {
    let length = this.data.filter((item) => item.id == elem.id).length;
    if (!length) {
      elem.counter = 1;
      this.data.push(elem);
    } else {
      this.data.forEach((item) => {
        if (item.id == elem.id) {
          item.counter += 1;
        }
      });
    }
    this.localStorageService.setData<TypeOfProduct[]>(
      'CartDataCount',
      this.data
    );
    this.reloadData();
  }
  reloadData() {
    this.productsSubj$.next(this.data);
  }
  deleteAllData() {
    this.data = [];
    this.localStorageService.setData<TypeOfProduct[]>(
      'CartDataCount',
      this.data
    );
    this.reloadData();
  }
  getTotal() {
    return this.data.reduce((acc, item) => acc + item.counter * item.price, 0);
  }

  getData(): TypeOfProduct[] {
    return this.data;
  }
  checkCount(elem: TypeOfProduct) {
    let counter: number = 0;
    this.data.forEach((item) => {
      if (item.id === elem.id) {
        counter += 1;
      }
    });
    return counter;
  }
  removeSetOfProduct(elem: TypeOfProduct) {
    this.data = this.data.filter((item) => item.id != elem.id);
    this.reloadData();
    this.localStorageService.setData<TypeOfProduct[]>(
      'CartDataCount',
      this.data
    );
  }
  incrementCounter(elem: TypeOfProduct) {
    this.setData(elem);
  }
  changeCounter(doing: 'increment' | 'decrement', elem: TypeOfProduct) {
    if (doing == 'increment') {
      this.incrementCounter(elem);
    } else if (doing == 'decrement') {
      this.decrementCounter(elem);
      this.productsSubj$.next(this.data);
    }
  }
  decrementCounter(elem: TypeOfProduct) {
    this.data.forEach((item, i) => {
      if (item.id === elem.id && item.counter > 1) {
        elem.counter -= 1;
      } else if (item.id === elem.id && item.counter == 1) {
        this.removeSetOfProduct(elem);
        elem.counter = 0;
      }
    });
    this.reloadData();
    this.localStorageService.setData<TypeOfProduct[]>(
      'CartDataCount',
      this.data
    );
  }
}
