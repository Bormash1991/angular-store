import { Component, OnDestroy, OnInit } from '@angular/core';
import { TypeOfProduct } from 'src/app/models/TypeOfProduct.inteface';
import { AddCartItemService } from 'src/app/shared/services/add-cart-item.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit, OnDestroy {
  data: TypeOfProduct[];
  totalSum: number = 0;
  subj: any;
  constructor(private addCartItemService: AddCartItemService) {}
  ngOnInit(): void {
    this.data = this.addCartItemService.getData();
    this.subj = this.addCartItemService.arrSubject$.subscribe(() =>
      this.changeData(this.addCartItemService.getData())
    );
    this.totalSum = this.addCartItemService.getTotal();
  }
  changeCounter(elem: ['increment' | 'decrement', TypeOfProduct]) {
    this.addCartItemService.changeCounter(elem[0], elem[1]);
    this.data = this.addCartItemService.getData();
    this.totalSum = this.addCartItemService.getTotal();
  }
  changeData(data: TypeOfProduct[]) {
    this.data = data;
    this.totalSum = this.addCartItemService.getTotal();
  }
  ngOnDestroy() {
    this.subj.unsubscribe();
  }
}
