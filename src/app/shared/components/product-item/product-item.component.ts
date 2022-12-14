import { TypeOfProduct } from '../../../models/TypeOfProduct.inteface';
import {
  AfterContentChecked,
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
  @Output() mouseClick = new EventEmitter();
  buttonText: string = 'Add to Cart';
  elem: TypeOfProduct;
  constructor(
    private addCartItemService: AddCartItemService,
    private changeDetector: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.router.url == '/products') {
      this.addCartItemService.reloadData();
      this.addCartItemService.arrSubject$.subscribe((n) => this.check(n));
    } else if (this.router.url == '/products/cart') {
      this.buttonText = 'Remove from Cart';
    }
  }
  click(elem: TypeOfProduct) {
    if (this.router.url != '/products/cart') {
      this.addCartItemService.setData(elem);
      this.check(elem);
    }
    if (this.router.url == '/products/cart') {
      this.addCartItemService.removeSetOfProduct(elem);
      let data = this.addCartItemService.getData();
      this.mouseClick.emit(data);
    }
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
