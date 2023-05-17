import { TypeOfOrder } from '../../../../models/TypeOfOrder.interface';
import { TypeOfProduct } from 'src/app/models/TypeOfProduct.inteface';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UpdateInfService {
  productData$ = new Subject();

  constructor() {}

  getData(): Observable<any> {
    return this.productData$.asObservable();
  }
  setData(data: TypeOfProduct) {
    this.productData$.next(data);
  }
}
