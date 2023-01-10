import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CloseOrOpenBarService {
  changingState$ = new BehaviorSubject<boolean>(false);
  constructor() {}
  open() {
    this.changingState$.next(true);
  }
  close() {
    this.changingState$.next(false);
  }
}
