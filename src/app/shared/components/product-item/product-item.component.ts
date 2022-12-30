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
  secondData: TypeOfProduct[];
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
    this.secondData = this.addCartItemService.getData();
    this.check(this.secondData);
    this.subj = this.addCartItemService.productsSubj$.subscribe((n) =>
      this.check(n)
    );
  }
  addOrDeleteItem(elem: TypeOfProduct) {
    if (this.router.url == '/products/cart') {
      this.addCartItemService.removeSetOfProduct(elem);
      return;
    }
    this.addCartItemService.setData(elem);
    this.buttonText = 'In Cart';
  }
  check(elems: TypeOfProduct[]) {
    if (!elems.length) {
      this.buttonText = 'Add to Cart';
      this.changeDetector.detectChanges();
    }
    for (let i = 0; i < elems.length; i++) {
    
      if (elems[i].id == this.productDate.id && elems[i].counter) {
        this.buttonText = 'In Cart';
        this.changeDetector.detectChanges();

        return;
      } else {
        this.buttonText = 'Add to Cart';
        this.changeDetector.detectChanges();
      }
    }
  }
}
