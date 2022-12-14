import { Component, OnInit } from '@angular/core';
import { TypeOfProduct } from 'src/app/models/TypeOfProduct.inteface';
import { AddCartItemService } from 'src/app/shared/services/add-cart-item.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  data: [TypeOfProduct, number][];
  constructor(private addCartItemService: AddCartItemService) {}
  ngOnInit(): void {
    this.data = this.addCartItemService.getData();
    this.addCartItemService.arrSubject$.subscribe(() =>
      this.changeData(this.addCartItemService.getData())
    );
  }
  changeCounter(elem: ['plus' | 'minus', TypeOfProduct]) {
    this.addCartItemService.changeCounter(elem[0], elem[1]);
    this.data = this.addCartItemService.getData();
    // this.totalSum = this.addCartItemService.getTotal();
  }
  changeData(data: [TypeOfProduct, number][]) {
    this.data = data;
  }
}
