import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ChangeCatalogueStateService {
  catalogueState$ = new BehaviorSubject<boolean>(false);
  constructor() {}
  setCatalogueState(value: boolean) {
    this.catalogueState$.next(value);
  }
  getCatalogueState() {
    return this.catalogueState$.asObservable();
  }
}
