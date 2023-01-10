import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TypeOfProduct } from '../../../models/TypeOfProduct.inteface';
@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss'],
})
export class CounterComponent {
  @Input() elem: TypeOfProduct;
  @Output() mouseClick = new EventEmitter();
  constructor() {}
  changeCounter(doing: 'increment' | 'decrement', elem: TypeOfProduct) {
    this.mouseClick.emit([doing, elem]);
  }
}
