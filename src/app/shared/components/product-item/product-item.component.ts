import { TypeOfProduct } from '../../../models/TypeOfProduct.inteface';
import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { AddCartItemService } from '../../services/add-cart-item.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss'],
})
export class ProductItemComponent implements OnInit {
  @Input() productDate: TypeOfProduct;
  buttonText: string = 'Add to Cart';
  subj: any;
  constructor(
    private addCartItemService: AddCartItemService,
    private changeDetector: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.router.url == '/products/cart') {
      this.buttonText = 'Remove from Cart';
      return;
    }
    this.check(this.productDate);
    this.subj = this.addCartItemService.arrSubject$.subscribe((n) =>
      this.check(n)
    );
  }
  addOrDeleteItem(elem: TypeOfProduct) {
    if (this.router.url == '/products/cart') {
      this.addCartItemService.removeSetOfProduct(elem);
      this.addCartItemService.arrSubject$.next(elem);
      return;
    }
    this.addCartItemService.setData(elem);
    this.buttonText = 'In Cart';
  }
  check(elem: TypeOfProduct) {
    let data = this.addCartItemService.getData();
    for (let i = 0; i < data.length; i++) {
      if (
        data[i][0].id == this.productDate.id &&
        data[i][1] >= 1 &&
        data[i][0].id == elem.id
      ) {
        this.buttonText = 'In Cart';
        this.changeDetector.detectChanges();
        return;
      }
    }
    if (this.productDate.id == elem.id) {
      this.buttonText = 'Add to Cart';
      this.changeDetector.detectChanges();
    }
  }
}
