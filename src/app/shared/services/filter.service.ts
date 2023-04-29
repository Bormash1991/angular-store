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
    this.pageIndex = 0;
    return this.products;
  }
  changeData(
    elem: filterCongig,
    param: 'price' | 'updatedAtUsers' | 'updatedAtOrders'
  ) {
    let typeOfName = '';
    let nextParam = '';
    if (param == 'updatedAtUsers') {
      nextParam = 'updatedAt';
      typeOfName = 'username';
    } else if (param == 'updatedAtOrders') {
      nextParam = 'updatedAt';
      typeOfName = 'name';
    } else if (param == 'price') {
      nextParam = 'price';
      typeOfName = 'name';
    }
    let keyProducts = nextParam as keyof T;
    let keyFilter = nextParam as keyof filterCongig;
    if (elem[keyFilter] && elem.select && elem.search) {
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
      this.products = this.products.filter(
        (product: any) =>
          product[typeOfName].toLowerCase().search(elem.search.toLowerCase()) >=
          0
      );
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
    if ((!elem.search && !elem[keyFilter]) || (!elem.select && !elem.search)) {
      this.products = this.productsSecond;
      this.productsLength = this.productsSecond.length;
      this.pageIndex = 0;
      this.allProductsAfterFilter = [...this.products];
    }
    this.firstPage();
    return {
      items: this.products,
      itemsLength: this.productsLength,
      pageIndex: this.pageIndex,
    };
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
        index * this.num,
        lastIndex * this.num
      );
      this.pageIndex--;
    }
    return {
      items: this.products,
      pageIndex: this.pageIndex,
    };
  }
  sortData(elem: filterCongig) {
    if (!elem.sortBy) {
      this.products = this.allProductsAfterFilter;
      this.firstPage();
      return this.products;
    }
    if (elem.sortBy == 'price') {
      this.allProductsAfterFilter.sort(
        this.byFieldPrice(elem.sortBy, elem.sortAs)
      );
    } else {
      this.allProductsAfterFilter.sort(this.byField(elem.sortBy, elem.sortAs));
    }
    this.firstPage();
    return this.products;
  }
  byFieldPrice(field: string, from: string) {
    return (a: any, b: any) =>
      from == 'less'
        ? a[field] > b[field]
          ? 1
          : -1
        : a[field] < b[field]
        ? 1
        : -1;
  }
  byField(field: string, from: string) {
    return (a: any, b: any) =>
      from == 'less'
        ? a[field].toLocaleLowerCase() > b[field].toLocaleLowerCase()
          ? 1
          : -1
        : a[field].toLocaleLowerCase() < b[field].toLocaleLowerCase()
        ? 1
        : -1;
  }
  resetData() {
    this.products = [];
    this.productsSecond = [];
    this.allProductsAfterFilter = [];
    this.productsLength = 0;
    this.num = 0;
    this.pageIndex = 0;
  }
}
