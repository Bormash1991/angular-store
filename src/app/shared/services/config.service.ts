import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { filterCongig } from 'src/app/models/TypeOfFilterConfig.interface';

const DEFAULT_CONFIGURATION: filterCongig = {
  createdAt: ``,
  price: 0,
  search: '',
  select: '',
  sortAs: '',
  sortBy: '',
};

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  configuration$: BehaviorSubject<filterCongig> = new BehaviorSubject(
    DEFAULT_CONFIGURATION
  );

  constructor() {}
  get DefaultConfiguration() {
    return this.configuration$.getValue();
  }
  setDefault() {
    this.configuration$.next(DEFAULT_CONFIGURATION);
  }
  setSearch(search: string) {
    this.configuration$.next({
      ...this.DefaultConfiguration,
      search,
    });
  }
  setSortAs(sortAs: string) {
    this.configuration$.next({
      ...this.DefaultConfiguration,
      sortAs,
    });
  }
  setSortBy(sortBy: string) {
    this.configuration$.next({
      ...this.DefaultConfiguration,
      sortBy,
    });
  }
  setPrice(price: number) {
    this.configuration$.next({
      ...this.DefaultConfiguration,
      price,
    });
  }
  setDate(createdAt: string) {
    this.configuration$.next({
      ...this.DefaultConfiguration,
      createdAt,
    });
  }
  setSelect(select: string) {
    this.configuration$.next({
      ...this.DefaultConfiguration,
      select,
    });
  }
}
