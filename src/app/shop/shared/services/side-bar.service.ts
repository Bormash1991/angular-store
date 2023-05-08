import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SideBarService {
  sidebarStatus$ = new Subject();
  constructor() {}

  getSidebarStatus() {
    return this.sidebarStatus$.asObservable();
  }
  setSidebarStatus(value: boolean) {
    this.sidebarStatus$.next(value);
  }
}
