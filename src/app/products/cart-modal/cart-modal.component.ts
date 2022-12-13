import { TypeOfProduct } from './../../models/TypeOfProduct.inteface';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';
import { AddCartItemService } from 'src/app/shared/services/add-cart-item.service';

@Component({
  selector: 'app-cart-modal',
  templateUrl: './cart-modal.component.html',
  styleUrls: ['./cart-modal.component.scss'],
})
export class CartModalComponent implements OnChanges {
  data: [TypeOfProduct, number][] = [];
  totalSum: number;
  @Input() className: string;
  @Output() mouse = new EventEmitter();
  constructor(private addCartItemService: AddCartItemService) {}
  ngOnChanges(): void {
    this.data = this.addCartItemService.getData();
    this.totalSum = this.addCartItemService.getTotal();
  }

  changeCounter(doing: 'plus' | 'minus', elem: TypeOfProduct) {
    if (doing == 'plus') {
      this.addCartItemService.plusCounter(elem);
    } else if (doing == 'minus') {
      this.addCartItemService.minusCounter(elem);
      this.addCartItemService.arrSubject$.next(elem);
    }
    this.data = this.addCartItemService.getData();
    this.totalSum = this.addCartItemService.getTotal();
    if (this.data.length == 0) {
      this.mouse.emit('hide');
    }
  }
}
