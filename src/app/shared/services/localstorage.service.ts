import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}
  setData<T>(key: string, data: T) {
    localStorage.setItem(key, JSON.stringify(data));
  }
  getData<T>(key: string): T | void {
    if (localStorage.getItem(key) !== null) {
      return JSON.parse(localStorage.getItem(key)!);
    }
  }
}
