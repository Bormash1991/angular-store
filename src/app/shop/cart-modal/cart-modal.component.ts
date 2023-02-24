import { API_PATH } from './../../shared/services/base-http.service';
import { TypeOfProduct } from './../../models/TypeOfProduct.inteface';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from '@angular/core';
import { AddCartItemService } from 'src/app/shared/services/add-cart-item.service';

@Component({
  selector: 'app-cart-modal',
  templateUrl: './cart-modal.component.html',
  styleUrls: ['./cart-modal.component.scss'],
})
export class CartModalComponent implements OnChanges {
  data: TypeOfProduct[] = [];
  totalSum: number;
  @Input() className: string;
  @Output() mouse = new EventEmitter();
  path = API_PATH;
  constructor(private addCartItemService: AddCartItemService) {}
  ngOnChanges(): void {
    this.data = this.addCartItemService.getData();
    this.totalSum = this.addCartItemService.getTotal();
  }
  changeCounter(elem: ['increment' | 'decrement', TypeOfProduct]) {
    this.addCartItemService.changeCounter(elem[0], elem[1]);
    this.changeData();
  }
  changeData() {
    this.data = this.addCartItemService.getData();
    this.totalSum = this.addCartItemService.getTotal();
    if (this.data.length == 0) {
      this.mouse.emit('hide');
    }
  }
  delete(elem: TypeOfProduct) {
    this.addCartItemService.removeSetOfProduct(elem);
    this.changeData();
  }
}
