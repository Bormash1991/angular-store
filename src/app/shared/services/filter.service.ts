import { Injectable } from '@angular/core';
import { filterCongig } from 'src/app/models/TypeOfFilterConfig.interface';

@Injectable({
  providedIn: 'root',
})
export class FilterService<T> {
  public products: T[] = [];
  private productsSecond: T[] = [];
  private allProductsAfterFilter: T[] = [];
  public productsLength: number;
  public pageIndex: number = 0;
  private num: number;
  constructor() {}
  setData(data: T[], num: number) {
    this.products = data;
    this.productsSecond = [...data];
    this.allProductsAfterFilter = [...data];
    this.productsLength = data.length;
    this.num = num;
    this.firstPage();
    return this.products;
  }
  changeData(elem: filterCongig, param: 'price' | 'createdAt' | '') {
    let typeOfName = '';
    if (param == 'createdAt') {
      typeOfName = 'username';
    } else {
      typeOfName = 'name';
    }
    let keyProducts = param as keyof T;
    let keyFilter = param as keyof filterCongig;
    if (elem[keyFilter] && elem.select && elem.search) {
      this.products = this.productsSecond.filter((product: any) => {
        product[typeOfName]
          .toLocaleLowerCase()
          .search(elem.search.toLocaleLowerCase()) >= 0;
      });
      if (elem.select == 'More than') {
        this.products = this.products.filter(
          (product) => product[keyProducts] > elem[keyFilter]
        );
      }
      if (elem.select == 'Less than') {
        this.products = this.products.filter(
          (product) => product[keyProducts] < elem[keyFilter]
        );
      }
      this.productsLength = this.products.length;
      this.pageIndex = 0;
      this.allProductsAfterFilter = [...this.products];
    }
    if (elem[keyFilter] && elem.select && !elem.search) {
      if (elem.select == 'More than') {
        this.products = this.productsSecond.filter(
          (product) => product[keyProducts] > elem[keyFilter]
        );
      }
      if (elem.select == 'Less than') {
        this.products = this.productsSecond.filter(
          (product) => product[keyProducts] < elem[keyFilter]
        );
      }
      this.productsLength = this.products.length;
      this.pageIndex = 0;
      this.allProductsAfterFilter = [...this.products];
    }
    if (elem.search && !elem[keyFilter] && !elem.select) {
      this.products = this.productsSecond.filter(
        (product: any) =>
          product[typeOfName].toLowerCase().search(elem.search.toLowerCase()) >=
          0
      );
      this.productsLength = this.products.length;
      this.pageIndex = 0;
      this.allProductsAfterFilter = this.products;
    }
    if (!elem.search && !elem[keyFilter]) {
      this.products = this.productsSecond;
      this.productsLength = this.productsSecond.length;
      this.pageIndex = 0;
      this.allProductsAfterFilter = [...this.products];
    }
    this.firstPage();
    return [this.products, this.productsLength, this.pageIndex];
  }
  firstPage() {
    this.products = this.allProductsAfterFilter.slice(0, this.num);
  }
  changePage(event: any) {
    let index = event.pageIndex;
    let lastIndex = event.previousPageIndex;
    if (index > lastIndex) {
      this.products = this.allProductsAfterFilter.slice(
        (lastIndex + 1) * this.num,
        (index + 1) * this.num
      );
      this.pageIndex++;
    }
    if (index < lastIndex) {
      this.products = this.allProductsAfterFilter.slice(
        index * 5,
        lastIndex * 5
      );
      this.pageIndex--;
    }
    return [this.products, this.pageIndex];
  }
  sortData(elem: filterCongig) {
    if (!elem.sortBy) {
      this.products = this.allProductsAfterFilter;
      this.firstPage();
      return this.products;
    }
    this.allProductsAfterFilter.sort(this.byField(elem.sortBy, elem.sortAs));
    this.firstPage();
    return this.products;
  }
  byField(field: string, from: string) {
    return (a: any, b: any) =>
      from == 'less'
        ? a[field] > b[field]
          ? 1
          : -1
        : a[field] < b[field]
        ? 1
        : -1;
  }
}
