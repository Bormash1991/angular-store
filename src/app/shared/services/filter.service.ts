import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { filterCongig } from 'src/app/models/TypeOfFilterConfig.interface';

const DEFAULT_CONFIGURATION: filterCongig = {
  date: `${new Date().getFullYear()}-${
    new Date().getMonth() + 1
  }-${new Date().getDate()}`,
  price: 0,
  search: '',
  select: '',
};

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  configuration$: BehaviorSubject<filterCongig> = new BehaviorSubject(
    DEFAULT_CONFIGURATION
  );
  constructor() {}
  get DefaultConfiguration() {
    return this.configuration$.getValue();
  }

  setSearch(search: string) {
    this.configuration$.next({
      ...this.DefaultConfiguration,
      search,
    });
    
  }
  setPrice(price: number) {
    this.configuration$.next({
      ...this.DefaultConfiguration,
      price,
    });
  }
  setDate(date: string) {
    this.configuration$.next({
      ...this.DefaultConfiguration,
      date,
    });
  }
  setSelect(select: string) {
    this.configuration$.next({
      ...this.DefaultConfiguration,
      select,
    });
  }
}
