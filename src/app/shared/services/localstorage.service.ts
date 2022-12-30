import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}
  setData<T>(key: string, data: T) {
    localStorage.setItem(key, JSON.stringify(data));
  }
  getData<T>(key: string): T | [] {
    const item = localStorage.getItem(key);
    if (item == null) {
      return [];
    } else {
      return JSON.parse(item);
    }
  }
}
